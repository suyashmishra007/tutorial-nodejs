const fs = require("fs");
const path = require("path");

const p = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static async addProduct(id, productPrice) {
    try {
      const fileContent = await fs.promises.readFile(p);
      let cart = { products: [], totalPrice: 0 };
      if (fileContent) {
        try {
          cart = JSON.parse(fileContent);
        } catch (jsonErr) {
          console.log("Error parsing JSON:", jsonErr);
        }
      }
      const existingProductIndex = cart.products.findIndex(
        (prod) => prod.id === id
      );
      const existingProduct = cart.products[existingProductIndex];
      let updatedProduct;

      if (existingProduct) {
        updatedProduct = { ...existingProduct };
        updatedProduct.qty = updatedProduct.qty + 1;
        cart.products = [...cart.products];
        cart.products[existingProductIndex] = updatedProduct;
      } else {
        updatedProduct = { id: id, qty: 1 };
        cart.products = [...cart.products, updatedProduct];
      }

      cart.totalPrice = cart.totalPrice + +productPrice;

      await fs.promises.writeFile(p, JSON.stringify(cart));
    } catch (err) {
      console.log("Error:", err);
    }
  }
};
