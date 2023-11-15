import { ProductManager } from "./ProductManager.js";
import express from "express";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const port = 8080;

const ProductsManager = new ProductManager("./src/ProductsList.json");

app.get("/products/", (req, res) => {
  let limit = req.query.limit;
  const products = ProductsManager.getProducts();
  if (!limit) return res.send({ products });

  let productsFiltered = products.filter((product) => product.id <= limit);
  res.send({ productsFiltered });
});

app.get("/products/:pid", (req, res) => {
  let pid = req.params.pid;

  let product = ProductsManager.findProductById(Number(pid));

  if (!product) return res.send("Product not found.");

  res.send({ product });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
