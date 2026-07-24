import "dotenv/config";
import express from "express";
import productRoute from "./router/productRoute";
import userRoute from "./router/userRoute";
import transferRoute from "./router/transferRoute";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import {} from "./middlewares/authMiddleware";
import path from "node:path";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use("/products", productRoute);
app.use("/users", userRoute);
app.use("/transfer", transferRoute);
// untuk liat gambar di browser
app.use("/uploads", express.static(path.join(process.cwd(), "public/uploads")));

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server jalan di port http://localhost:${port}`);
});
