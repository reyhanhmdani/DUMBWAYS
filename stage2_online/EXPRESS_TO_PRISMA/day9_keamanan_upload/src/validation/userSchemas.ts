import { z } from "zod";

export const loginSchema = z.object({
  email: z.email("Format email tidak valid"),
  password: z.string().min(1, "Password tidak boleh kosong"),
});
export const registerSchema = z.object({
  name: z.string().min(1, "Nama tidak boleh kosong"),
  email: z.email("Format email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter"),
});
