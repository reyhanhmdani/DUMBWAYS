import { Router } from "express";
import { transferPoint } from "../controllers/userController";
import { validate } from "../middlewares/validate";
import { transferSchema } from "../validation/transferSchema";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.post("/", validate(transferSchema), authMiddleware, transferPoint);

export default router;
