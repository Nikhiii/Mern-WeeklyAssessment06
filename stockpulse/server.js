const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Stock = require("./models/stockModel");
const stockRoutes = require("./routers/stockRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "views" directory
app.use(express.static('views'));

app.get('/add-stock', (req, res) => {
  res.render('addStock');
});

app.get('/get-stock', async (req, res) => {
  try {
    const stocks = await Stock.find({});
    res.render('getStock', { stocks: stocks });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/updateStock', async (req, res) => {
  try {
    const stockId = req.query.stockId;
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).send("Stock not found");
    }

    res.render('updateStock', { stock });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/deleteStock', async (req, res) => {
  try {
    const stockId = req.query.stockId;
    const stock = await Stock.findById(stockId);

    if (!stock) {
      return res.status(404).send("Stock not found");
    }

    await Stock.findByIdAndRemove(stockId);

    res.redirect('/get-stock');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the stock");
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

app.use("/stock", stockRoutes);

module.exports = app;