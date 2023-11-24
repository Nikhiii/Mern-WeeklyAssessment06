const express = require("express");
const path = require('path');
const mongoose = require("mongoose");
const Movie = require("./models/movieModel");
const movieRoutes = require("./routers/movieRouter");
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static assets from the "views" directory
app.use(express.static('views'));

app.get('/add-movie', (req, res) => {
  res.render('addMovie');
});

app.get('/get-movie', async (req, res) => {
  try {
    const movies = await Movie.find({});
    const userNames = [];
    const ratings = [];
    const texts = [];

    movies.forEach(movie => {
      if (movie.reviews.length > 0) {
        const review = movie.reviews[0];
        userNames.push(review.userName);
        ratings.push(review.rating);
        texts.push(review.text);
      }
    });

    res.render('getMovie', { movies: movies, userName: userNames, rating: ratings, text: texts });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});

app.get('/updateMovie', async (req, res) => {
  try {
    const movieId = req.query.movieId;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    res.render('updateMovie', { 
      movieId: movieId,
      title: movie.title,
      director: movie.director,
      genre: movie.genre,
      releaseYear: movie.releaseYear,
      description: movie.description,
      userName: movie.reviews[0].userName,
      rating: movie.reviews[0].rating,
      text: movie.reviews[0].text
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database");
  }
});




app.get('/deleteMovie', async (req, res) => {
  try {
    const movieId = req.query.movieId;
    const movie = await Movie.findById(movieId);

    if (!movie) {
      return res.status(404).send("Movie not found");
    }

    await Movie.findByIdAndRemove(movieId);

    res.redirect('/get-movie');
  } catch (error) {
    console.error(error);
    res.status(500).send("Error deleting the movie");
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

app.use("/movie", movieRoutes);

module.exports = app;