const express = require('express'); // Importamos la librería express
const ProductManager = require('./ProductManager'); // Importamos la clase ProductManager

const app = express(); // Creamos una instancia de express
const productManager = new ProductManager('products.json'); // Creamos una instancia de ProductManager

// Define la ruta GET "/products"
app.get('/products', async (req, res) => {
  let products = await productManager.getProducts(); // Obtiene todos los productos a través de la clase ProductManager
  const limit = req.query.limit; // Obtiene el límite opcional desde la consulta
  if (limit) {
    products = products.slice(0, limit); // Limita la cantidad de productos si el límite fue especificado
  }
  res.json({ products }); // Devuelve los productos en formato JSON
});

// Define la ruta GET "/products/:pid"
app.get('/products/:pid', async (req, res) => {
  const pid = req.params.pid; // Obtiene el ID del producto desde los parámetros de la ruta
  const product = await productManager.getProductById(pid); // Obtiene el producto específico a través de la clase ProductManager
  if (product) { //Verificamos que el producto con el pid utilizado exista
    res.json({ product }); // Devuelve el producto en formato JSON
  } else { // Si no existe da un error y avisa que no existe
    res.status(404).json({ error: `Product with ID '${pid}' not found.` });
  }
});

// Inicia el servidor en el puerto 8080
app.listen(8080, () => {
  console.log('Server running on port 8080'); // Muestra un mensaje en la consola cuando el servidor se inicia correctamente
});