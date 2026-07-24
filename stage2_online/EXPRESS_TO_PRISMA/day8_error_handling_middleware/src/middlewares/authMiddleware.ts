import { Request, Response, NextFunction } from "express";

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey || apiKey !== "rahasia123") {
    return res.status(401).json({ message: "API key tidak valid" });
  }

  next();
};
