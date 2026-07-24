import { Request, Response, NextFunction } from "express";
import { ApiError } from "../utils/apiError";

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  // cek apakah error ini adalah apiEror buatan kita?
  if (err instanceof ApiError) {
    return res.status(err.statusCode).json({
      status: err.statusCode,
      message: err.message,
    });
  }

  // kalau bukan buatan kita (error tak terduga / bug )
  console.log("error ga terduga / unexpected nih:", err);

  return res.status(500).json({
    status: "error",
    message: "Terjadi kesalahan pada server/codingan",
  });
};
