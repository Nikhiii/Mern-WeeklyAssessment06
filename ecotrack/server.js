const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Emission = require("./models/emissionModel");
const emissionRoutes = require("./routers/emissionRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "views" directory
app.use(express.static('views'));

app.get('/add-emission', (req, res) => {
  res.render('addEmission');
});

app.get('/get-emission', async (req, res) => {
  try {
    const emissions = await Emission.find({});
    res.render('getEmission', { emissions: emissions });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/updateEmission', async (req, res) => {
  try {
    const emissionId = req.query.emissionId;
    const emission = await Emission.findById(emissionId);

    if (!emission) {
      return res.status(404).send("Emission not found");
    }

    res.render('updateEmission', { emission });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/deleteEmission', async (req, res) => {
  try {
    const emissionId = req.query.emissionId;
    const emission = await Emission.findById(emissionId);

    if (!emission) {
      return res.status(404).send("Emission not found");
    }

    await Emission.findByIdAndRemove(emissionId);

    res.redirect('/get-emission');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the emission");
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

app.use("/emission", emissionRoutes);

module.exports = app;