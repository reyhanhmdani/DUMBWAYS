import { Router } from "express";
import { allUsers, login, register } from "../controllers/userController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/",  allUsers);
router.post("/register", register);
router.post("/login", login);

export default router;
