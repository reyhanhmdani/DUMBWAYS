import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getProduct, readProducts, updateProductPartial } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authorization } from "../middlewares/authorization";
import { upload } from "../config/multer";

const router = Router();

router.get("/", readProducts);
router.get("/:idProduct", getProduct);
router.post("/", upload.single("image"), createProduct);
router.put("/:idProduct", editProduct);
router.patch("/:idProduct", updateProductPartial);
router.delete("/:idProduct", authMiddleware, authorization("ADMIN"), deleteProduct);

export default router;
