import { Router } from "express";
import { allUsers, getProfile, login, register } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { loginSchema, registerSchema } from "../validation/userSchemas";
import { validate } from "../middlewares/validate";
import { upload } from "../config/multer";

const router = Router();

router.get("/", allUsers);
router.get("/profile", authMiddleware, getProfile);
router.post("/register", upload.single("profilePicture"), validate(registerSchema), register);
router.post("/login", validate(loginSchema), login);

export default router;
