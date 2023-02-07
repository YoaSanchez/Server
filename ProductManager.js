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
const products = productManager.getProducts();

productManager.addProduct("Product 1", "Description 1", 10, "path/to/img", "P001", 20);
productManager.addProduct("Product 2", "Description 2", 20, "path/to/img", "P002", 30);
productManager.addProduct("Product 3", "Description 3", 20, "path/to/img", "P003", 17);
productManager.addProduct("Product 4", "Description 4", 20, "path/to/img", "P004", 9);
productManager.addProduct("Product 5", "Description 5", 312, "path/to/img", "P005", 34);
productManager.addProduct("Product 6", "Description 6", 213, "path/to/img", "P006", 13);
productManager.addProduct("Product 7", "Description 7", 132, "path/to/img", "P007", 7);
productManager.addProduct("Product 8", "Description 8", 231, "path/to/img", "P008", 24);
productManager.addProduct("Product 9", "Description 9", 321, "path/to/img", "P009", 10);
productManager.addProduct("Product 10", "Description 10", 123, "path/to/img", "P0010", 5);
console.log(products);

module.exports = ProductManager;
