import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ApiError } from "../utils/apiError";

export const authorization = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // 1. Pastikan user sudah ter-authenticate
    const user = (req as any).user;
    if (!user) {
      throw new ApiError(401, "You belum login!");
    }

    // 2. Cek apakah role user termasuk dalam daftar yang diizinkan, ini check yang di token
    if (!allowedRoles.includes(user.role)) {
      throw new ApiError(
        403,
        `Akses ditolak! Fitur ini hanya untuk role: ${allowedRoles.join(", ")}`
      );
    }

    // 3. Rolenya valid, gaskeun
    next();
  };
};
