const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Product = require("./models/productModel");
const productRoutes = require("./routers/productRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "views" directory
app.use(express.static('views'));

app.get('/add-product', (req, res) => {
  res.render('addProduct');
});

app.get('/get-product', async (req, res) => {
  try {
    const products = await Product.find({});
    res.render('getProduct', { products: products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/updateProduct', async (req, res) => {
  try {
    const productId = req.query.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    res.render('updateProduct', { product });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/deleteProduct', async (req, res) => {
  try {
    const productId = req.query.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send("Product not found");
    }

    // Delete the product from the database
    await Product.findByIdAndRemove(productId);

    res.redirect('/get-product');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the product");
  }
});

mongoose
  .connect("mongodb://0.0.0.0:27017/myapp")
  .then(() => {
    console.log("Database connected");
    app.listen(8080, () => {
      console.log("API is running in PORT:8080");
    });
  })
  .catch((error) => {
    console.log(error);
  });

app.use("/product", productRoutes);

module.exports = app;