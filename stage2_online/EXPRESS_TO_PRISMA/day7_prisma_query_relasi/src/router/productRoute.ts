import { Router } from "express";
import { createProduct, deleteProduct, editProduct, getProduct, readProducts, updateProductPartial } from "../controllers/productController";

const router = Router();

router.get("/products", readProducts);
router.get("/products/:idProduct", getProduct);
router.post("/products", createProduct);
router.put("/products/:idProduct", editProduct);
router.patch("/products/:idProduct", updateProductPartial);
router.delete("/products/:idProduct", deleteProduct);

export default router;
