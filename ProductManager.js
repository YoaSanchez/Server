const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
    this.lastId = 0;
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.error("All fields are required");
      return;
    }
    const productExists = this.products.find(
      (product) => product.code === code
    );
    if (productExists) {
      console.error("Code already exists");
      return;
    }

    this.lastId++;

    const newProduct = {
      id: this.lastId,
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    this.products.push(newProduct);
    this.saveProducts();

  }

  getProducts() {
    try {
      this.products = JSON.parse(fs.readFileSync(this.path));
    } catch (err) {
      console.error("Error reading products from file", err);
    }
    return this.products;
  }

  getProductById(id) {
    const products = this.getProducts();
    return products.find(product => product.id === id);
  }

  updateProduct(id, updatedProduct) {
    const products = this.getProducts();
    const index = products.findIndex(product => product.id === id);
    if (index >= 0) {
      this.products[index] = { ...products[index], ...updatedProduct };
      this.saveProducts();
    }
  }

  deleteProduct(id) {
    this.products = this.products.filter(product => product.id !== id);
    this.saveProducts();
  }

  saveProducts() {
    fs.writeFileSync(this.path, JSON.stringify(this.products));
  }
}

const productManager = new ProductManager('products.json');

module.exports = ProductManager;
