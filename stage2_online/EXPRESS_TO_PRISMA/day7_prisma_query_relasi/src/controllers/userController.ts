import prisma from "../config/prisma";
import { Request, Response } from "express";
import bcrypt from "bcryptjs";

export const allUsers = async (req: Request, res: Response) => {
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
    res.status(500).json({
      message: error,
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        status: 400,
        message: "name, email atau password ga boleh kosong",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "Email ini sudah terdaftar, silakan gunakan email lain!",
      });
    }

    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "data berhasil di buat",
      data: newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        status: 400,
        message: "email atau password ga boleh kosong",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email: email },
    });

    if (!existingUser) {
      return res.status(404).json({ message: "User tidak ditemukan!" });
    }

    // cek apakah password nya cocok
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Password salah!" });
    }

    // supaya tidak memunculkan password nya di json
    const { password: userPassword, ...userWithoutPassword } = existingUser;

    return res.status(200).json({
      message: "login berhasil",
      data: userWithoutPassword,
    });
  } catch (error) {
    res.status(500).json({
      message: error,
    });
  }
};
