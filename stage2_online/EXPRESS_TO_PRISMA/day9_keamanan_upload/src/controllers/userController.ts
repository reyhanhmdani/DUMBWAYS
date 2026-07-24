import prisma from "../config/prisma";
import { NextFunction, Request, Response } from "express";
import bcrypt from "bcryptjs";
import { ApiError } from "../utils/apiError";
import jwt, { JwtPayload } from "jsonwebtoken";

export const allUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await prisma.user.findMany({
      include: {
        products: {
          select: {
            name: true,
            price: true,
            stock: true,
            category: true,
          },
        },
      },
    });

    res.status(200).json({
      users,
    });
  } catch (error) {
    next(error);
  }
};

export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    // pengecekan validasi input sudah di registerSchema

    // cek emaiil
    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      throw new ApiError(400, "Email ini sudah terdaftar, silakan gunakan email lain!");
    }

    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ambil path gambarnya jika ada file/gambar di upload
    const profilePicture = req.file ? `/uploads/${req.file.filename}` : null;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        profilePicture,
      },
    });

    return res.status(201).json({
      message: "data berhasil di buat",
      data: newUser,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // pengecekan validasi input sudah di loginSchema

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      throw new ApiError(404, "User tidak ditemukan!");
    }

    // cek apakah password nya cocok
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      throw new ApiError(401, "Password salah!");
    }
    // penting : juga bisa langsung if kan untuk pengecekan email dan password dengan or

    const token = jwt.sign(
      {
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        role: existingUser.role,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: process.env.JWT_EXPIRES_IN || ("24h" as any) },
    );
    return res.status(200).json({
      message: "login berhasil",
      data: token,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // req.user sudah diisi oleh authenticate middleware
    const userId = (req as any).user.id;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        profilePicture: true,
        points: true,
        createdAt: true,
        // password ga di pilih yaaa..
      },
    });

    if (!user) {
      throw new ApiError(404, "User tidak ditemukan!");
    }

    return res.status(200).json({
      message: "Profile berhasil diambil",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const transferPoint = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { senderId, receiverId, amount } = req.body;

    if (senderId === receiverId) {
      throw new ApiError(403, "tidak bisa transfer ke diri sendiri");
    }
    await prisma.$transaction(async (tx) => {
      // 1. Cek sender
      const sender = await tx.user.findUnique({
        where: { id: Number(senderId) },
      });
      if (!sender) {
        throw new ApiError(404, "Sender tidak ditemukan!");
      }
      // 2. Cek receiver
      const receiver = await tx.user.findUnique({
        where: { id: Number(receiverId) },
      });
      if (!receiver) {
        throw new ApiError(404, "Receiver tidak ditemukan!");
      }

      if (sender.points === 0) {
        throw new ApiError(403, "Point anda abis, tidak bisa transfer");
      }
      if (sender.points < amount) {
        throw new ApiError(403, "point anda tidak cukul, tidak bisa transfer");
      }

      await tx.user.update({
        where: { id: Number(senderId) },
        data: { points: { decrement: Number(amount) } },
      });
      // 4. Tambah poin receiver
      await tx.user.update({
        where: { id: Number(receiverId) },
        data: { points: { increment: Number(amount) } },
      });
    });

    return res.status(200).json({
      message: `Berhasil mengirim ${amount} poin ke user ID ${receiverId}`,
    });
  } catch (error) {
    next(error);
  }
};
