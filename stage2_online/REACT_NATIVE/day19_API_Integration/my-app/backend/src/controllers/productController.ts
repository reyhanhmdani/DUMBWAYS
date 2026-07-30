import prisma from "../config/prisma";
import { NextFunction, Request, Response } from "express";
import { ApiError } from "../utils/apiError";

export const readProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { search, minPrice, sortBy, order } = req.query;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12; // Tampilkan 12 produk per halaman
    const skip = (page - 1) * limit;

    // Membuat kondisi pencarian Prisma secara dinamis
    const whereCondition: any = {};

    // Jika user mengirim query ?search=kaos
    if (search && String(search).trim() !== "") {
      whereCondition.name = {
        contains: String(search),
        mode: "insensitive", // disini mau gede kecil pun di gas asal misal nyari kucing Kucing itu sama aja
      };
    }

    if (minPrice) {
      whereCondition.price = {
        gte: Number(minPrice),
      };
    }

    // Fetch data ke database lewat Prisma
    const products = await prisma.product.findMany({
      where: whereCondition, // Pasang kondisi di sini
      skip: skip,
      take: limit,
      orderBy: {
        // Jika sortBy kosong, default urutkan berdasar "id"
        // Jika order kosong, default urutkan secara "desc" (terbaru/tertinggi)
        [sortBy ? String(sortBy) : "id"]: order ? String(order) : "desc",
      },
      include: {
        User: {
          select: {
            name: true,
          },
        },
      },
    });

    const totalData = await prisma.product.count({ where: whereCondition });
    const totalPages = Math.ceil(totalData / limit);

    return res.status(200).json({
      meta: {
        current_page: page,
        per_page: limit,
        total_data: totalData,
        total_pages: totalPages,
      },
      data: products,
    });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, price, stock, category, userId } = req.body;

    if (!name || !price || !stock) {
      throw new ApiError(400, "name, price dan stock tidak boleh kosong!");
    }

    // wajib konversi ke number price dan stock nya
    const priceNumber = parseInt(price);
    const stockNumber = parseInt(stock);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      throw new ApiError(400, "price dan stock harus berupa angka!");
    }

    const productImage = req.file ? `/uploads/${req.file.filename}` : null;

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: priceNumber,
        stock: stockNumber,
        productImage,
        category: category,
        userId: Number(userId),
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Product berhasil dibuat",
      data: newProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idProduct } = req.params;

    const getProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
      include: {
        User: true,
      },
    });

    if (!getProduct) {
      throw new ApiError(404, "Data produk tidak ditemukan!");
    }

    return res.status(200).json({
      data: getProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const editProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idProduct } = req.params;
    const { name, price, stock, category } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(idProduct) },
    });

    if (!existingProduct) {
      throw new ApiError(404, "Data produk tidak ditemukan!");
    }

    const currentUserId = (req as any).user.id;
    // cek jika bukan pemilik
    if (existingProduct.userId !== currentUserId) {
      throw new ApiError(403, "Tidak bisa melakukan update product milik orang lain!");
    }

    if (!name || !price || !stock) {
      throw new ApiError(400, "name, price dan stock tidak boleh kosong!");
    }

    const priceNumber = parseInt(price);
    const stockNumber = parseInt(stock);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      throw new ApiError(400, "price dan stock harus berupa angka!");
    }

    const productImage = req.file ? `/uploads/${req.file.filename}` : existingProduct.productImage;

    const updateProduct = await prisma.product.update({
      where: {
        id: Number(idProduct),
      },
      data: {
        name: name,
        price: priceNumber,
        stock: stockNumber,
        category: category,
        productImage,
      },
    });

    return res.status(200).json({
      message: "data berhasil di update",
      data: updateProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductPartial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idProduct } = req.params;
    const { name, price, stock, category, productImage } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
    });

    if (!existingProduct) {
      throw new ApiError(404, "Data tidak ditemukan");
    }
    const currentUserId = (req as any).user.id;
    // cek jika bukan pemilik
    if (existingProduct.userId !== currentUserId) {
      throw new ApiError(403, "Tidak bisa melakukan update product milik orang lain!");
    }
    // Siapkan wadah untuk data yang akan diupdate
    // Kita buat tipe datanya any dulu karena isinya bisa dinamis
    let updateData: any = {};

    // Cek satu per satu apa saja yang dikirim oleh client
    if (name !== undefined) {
      if (name.trim() === "") {
        throw new ApiError(400, "Nama tidak boleh kosong!");
      }
      updateData.name = name;
    }
    if (category) updateData.category = category;

    if (price) {
      const priceNumber = parseInt(price);
      if (isNaN(priceNumber)) throw new ApiError(400, "Harga harus angka");
      updateData.price = priceNumber;
    }

    if (stock) {
      const stockNumber = parseInt(stock);
      if (isNaN(stockNumber)) throw new ApiError(400, "Stok harus angka");
      updateData.stock = stockNumber;
    }

    if (req.file) {
      updateData.productImage = `/uploads/${req.file.filename}`;
    } else if (productImage) {
      updateData.productImage = productImage;
    }

    const updatedProduct = await prisma.product.update({
      where: { id: Number(idProduct) },
      data: updateData,
    });

    return res.status(200).json({
      message: "Data berhasil di update",
      data: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { idProduct } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
    });

    if (!existingProduct) {
      throw new ApiError(404, "Data produk tidak ditemukan!");
    }

    await prisma.product.delete({
      where: {
        id: Number(idProduct),
      },
    });

    return res.status(200).json({
      status: 200,
      message: `data dengan id ${idProduct} sudah terhapus`,
    });
  } catch (error) {
    next(error);
  }
};

