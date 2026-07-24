import { Request, Response, NextFunction } from "express";

export const logger = async (req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();

  // Tunggu response selesai dikirim, lalu hitung durasinya
  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`[${req.method}] ${req.url} → ${res.statusCode} (${duration}ms)`);
  });

  next();
};
