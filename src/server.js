import ProductList from "./ProductsList.json" assert { type: "json" };

import express from "express";

const app = express();
app.use(express.urlencoded({ extended: true }));
const port = 8080;

app.get("/products/", (req, res) => {
  let limit = req.query.limit;

  if (!limit) return res.send({ ProductList });

  let productsFiltered = ProductList.filter((product) => product.id <= limit);
  res.send({ productsFiltered });
});

app.get("/products/:pid", (req, res) => {
  let pid = req.params.pid;

  let product = ProductList.find((prod) => prod.id === Number(pid));

  if (!product) return res.send("Product not found.");

  res.send({ product });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
