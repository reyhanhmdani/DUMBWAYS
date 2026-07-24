import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getProduct, readProducts, updateProductPartial } from "../controllers/productController";
import { authMiddleware } from "../middlewares/authMiddleware";

const router = Router();

router.get("/", readProducts);
router.get("/:idProduct", getProduct);
router.post("/", createProduct);
router.put("/:idProduct", editProduct);
router.patch("/:idProduct", updateProductPartial);
router.delete("/:idProduct", deleteProduct);

export default router;
