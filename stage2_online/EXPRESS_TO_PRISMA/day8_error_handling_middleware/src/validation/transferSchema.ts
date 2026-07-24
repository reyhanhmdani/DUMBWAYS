import { z } from "zod";

export const transferSchema = z.object({
  senderId: z.coerce.number().int().positive({ message: "Sender ID tidak valid" }),
  receiverId: z.coerce.number().int().positive({ message: "Receiver ID tidak valid" }),
  amount: z.coerce.number().int().positive({ message: "Amount transfer harus lebih dari 0 dan angka positif" }),
});
