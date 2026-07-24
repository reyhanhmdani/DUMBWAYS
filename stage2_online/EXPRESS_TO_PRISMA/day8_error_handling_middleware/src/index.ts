import express from "express";
import productRoute from "./router/productRoute";
import userRoute from "./router/userRoute";
import transferRoute from "./router/transferRoute";
import { logger } from "./middlewares/logger";
import { errorHandler } from "./middlewares/errorHandler";
import { authMiddleware } from "./middlewares/authMiddleware";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(logger);
app.use("/products", authMiddleware, productRoute);
app.use("/users", userRoute);
app.use("/transfer", transferRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server jalan di port http://localhost:${port}`);
});
