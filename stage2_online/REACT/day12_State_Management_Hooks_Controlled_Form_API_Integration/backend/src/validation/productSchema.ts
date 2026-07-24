import { z } from "zod";

export const productSchema = z.object({
  name: z
    .string({ message: "Nama produk wajin diisi" })
    .min(3, { message: "Nama produk minimal 3 karakter!" })
    .max(100, { message: "Nama produk maksimal 100 karakter!" }),
  
  price: z
    .number({ message: "Harga wajib diisi!" })
    .int({ message: "Harga harus bilangan bulat!" })
    .positive({ message: "Harga harus lebih dari 0!" }),

  stock: z
    .number({ message: "Stok wajib diisi!" })
    .int({ message: "Stok harus bilangan bulat!" })
    .nonnegative({ message: "Stok tidak boleh negatif!" }),
  
   userId: z
    .number({ message: "userId wajib diisi!" })
    .int({ message: "userId harus bilangan bulat!" }),
});
