import prisma from "../config/prisma";
import { Request, Response } from "express";

export const readProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        id: "desc",
      },
    });

    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error ambil data",
    });
  }
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, category } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({
        status: 400,
        message: "name, price dan stock tidak boleh kosong!",
      });
    }

    // wajib konversi ke number price dan stock nya
    const priceNumber = parseInt(price);
    const stockNumber = parseInt(stock);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      return res.status(400).json({
        status: 400,
        message: "price dan stock harus berupa angka!",
      });
    }

    const newProduct = await prisma.product.create({
      data: {
        name: name,
        price: priceNumber,
        stock: stockNumber,
        category: category,
      },
    });

    return res.status(201).json({
      status: 201,
      message: "Product berhasil dibuat",
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const  getProduct = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.params;

    const getProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
    });

    if (!getProduct) {
      return res.status(404).json({
        message: "data nggak nemu",
      });
    }

    return res.status(200).json({
      data: getProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const editProduct = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.params;
    const { name, price, stock, category } = req.body;

    if (!name || !price || !stock) {
      return res.status(400).json({
        status: 400,
        message: "name, price dan stock tidak boleh kosong!",
      });
    }

    const priceNumber = parseInt(price);
    const stockNumber = parseInt(stock);

    if (isNaN(priceNumber) || isNaN(stockNumber)) {
      return res.status(400).json({
        status: 400,
        message: "price dan stock harus berupa angka!",
      });
    }

    const existingProduct = await prisma.product.findUnique({
      where: { id: Number(idProduct) },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "Data produk tidak ditemukan!",
      });
    }

    const updateProduct = await prisma.product.update({
      where: {
        id: Number(idProduct),
      },
      data: {
        name: name,
        price: priceNumber,
        stock: stockNumber,
        category: category,
      },
    });

    return res.status(200).json({
      message: "data berhasil di update",
      data: updateProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const updateProductPartial = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.params;
    const { name, price, stock, category } = req.body;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({ message: "Data tidak ditemukan" });
    }

    // Siapkan wadah untuk data yang akan diupdate
    // Kita buat tipe datanya any dulu karena isinya bisa dinamis
    let updateData: any = {};

    // Cek satu per satu apa saja yang dikirim oleh client
    if (name !== undefined) {
      if (name.trim() === "") {
        return res.status(400).json({ message: "Nama tidak boleh kosong!" });
      }
      updateData.name = name;
    }
    if (category) updateData.category = category;

    if (price) {
      const priceNumber = parseInt(price);
      if (isNaN(priceNumber)) return res.status(400).json({ message: "Harga harus angka" });
      updateData.price = priceNumber;
    }

    if (stock) {
      const stockNumber = parseInt(stock);
      if (isNaN(stockNumber)) return res.status(400).json({ message: "Stok harus angka" });
      updateData.stock = stockNumber;
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
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { idProduct } = req.params;

    const existingProduct = await prisma.product.findUnique({
      where: {
        id: Number(idProduct),
      },
    });

    if (!existingProduct) {
      return res.status(404).json({
        message: "data nggak nemu",
      });
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
    res.status(500).json({
      message: error,
    });
  }
};
