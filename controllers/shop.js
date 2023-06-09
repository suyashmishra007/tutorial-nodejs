const Product = require("../models/product");
const Cart = require("../models/cart");

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/product-list", {
        prods: products,
        pageTitle: "All Products",
        path: "/products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  // METHOD 1
  Product.findAll({ where: { id: productId } })
    .then((product) => {
      if (product) {
        res.render("shop/product-detail", {
          product: product[0].dataValues,
          pageTitle: product[0].dataValues.title,
          path: "/products",
        });
      } else {
        console.log(`product with ID ${productId} not found.`);
      }
    })
    .catch((error) => {
      console.error("Error occurred while retrieving product:", error);
    });

  // * METHOD 2
  // Product.findByPk(productId)
  //   .then((product) => {
  //     if (product) {
  //       res.render("shop/product-detail", {
  //         product: product,
  //         pageTitle: product.title,
  //         path: "/products",
  //       });
  //     } else {
  //       console.log(`product with ID ${productId} not found.`);
  //     }
  //   })
  //   .catch((error) => {
  //     console.error("Error occurred while retrieving product:", error);
  //   });
};

exports.getIndex = (req, res, next) => {
  Product.findAll()
    .then((products) => {
      res.render("shop/index", {
        prods: products,
        pageTitle: "Shop",
        path: "/",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// ! FIXME : HotFix
exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    Product.fetchAll((products) => {
      const cartProducts = [];
      for (product of products) {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          cartProducts.push({ productData: product, qty: cartProductData.qty });
        }
      }
      res.render("shop/cart", {
        path: "/cart",
        pageTitle: "Your Cart",
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect("/cart");
};

// ! Hotfix : statuscode 302
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.deleteProduct(prodId, product.price);
    return res.redirect("/cart");
  });
};

exports.getOrders = (req, res, next) => {
  res.render("shop/orders", {
    path: "/orders",
    pageTitle: "Your Orders",
  });
};

exports.getCheckout = (req, res, next) => {
  res.render("shop/checkout", {
    path: "/checkout",
    pageTitle: "Checkout",
  });
};
