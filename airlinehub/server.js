const express = require("express");
const path = require('path');
const fs = require('fs');
// const mongoose = require("mongoose");
// const Airline = require("./models/airlineModel");
const airlineRoutes = require("./routers/airlineRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "views" directory
app.use(express.static('views'));

app.get('/add-airline', (req, res) => {
  res.render('addAirline');
});

app.get('/get-airline', async (req, res) => {
  try {
    const airlines = await Airline.find({});
    res.render('getAirline', { airlines: airlines });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/updateAirline', async (req, res) => {
  try {
    const airlineId = req.query.airlineId;
    const airline = await Airline.findById(airlineId);

    if (!airline) {
      return res.status(404).send("Airline not found");
    }
    const departureTime = airline.departureTime;
    const arrivalTime = airline.arrivalTime;

    res.render('updateAirline', { airline, departureTime, arrivalTime });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/deleteAirline', async (req, res) => {
  try {
    const airlineId = req.query.airlineId;
    const airline = await Airline.findById(airlineId);

    if (!airline) {
      return res.status(404).send("Airline not found");
    }

    // Delete the airline from the database
    await Airline.findByIdAndRemove(airlineId);

    res.redirect('/get-airline');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the airline");
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

app.use("/airline", airlineRoutes);

module.exports = app;