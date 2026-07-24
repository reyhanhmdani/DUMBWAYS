import express from "express";
import productRoute from "./router/productRoute";

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", productRoute);

app.listen(port, () => {
  console.log(`Server jalan di port http://localhost:${port}`);
});
