const express = require('express');
const ProductManager = require('./ProductManager');

const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
  let products = await productManager.getProducts();
  const limit = req.query.limit;
  if (limit) {
    products = products.slice(0, limit);
  }
  res.json({ products });
});

app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid;
  const product = await productManager.getProductById(pid);
  res.json({ product });
});

app.listen(8080, () => {
  console.log('Server running on port 8080');
});