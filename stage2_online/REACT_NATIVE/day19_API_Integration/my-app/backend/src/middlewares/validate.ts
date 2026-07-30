import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import fs from "fs";

export const validate = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      // misal gagal ketika register, gambar tetep tidak masuk ke folder public .. / mencegah masuk lah ya...
      if (req.file) {
        fs.unlinkSync(req.file.path);
      }
      if (error instanceof z.ZodError) {
        const formattedErrors = error.issues.map((err) => ({
          field: err.path.join("."),
          message: err.message,
        }));

        return res.status(400).json({
          errors: formattedErrors,
        });
      }

      next(error);
    }
  };
};

// cara sebelumnya
// if (error instanceof z.ZodError) {
//         return res.status(400).json({
//           message: "data tidak valid",
//           errors: z.treeifyError(error),
//         });
//       }
