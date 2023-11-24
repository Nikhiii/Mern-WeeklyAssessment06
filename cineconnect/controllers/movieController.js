const Movie = require("../models/movieModel");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
const getMovieById = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMovie = async (req, res) => {
  try {
    const {
      title,
      director,
      genre,
      releaseYear,
      description,
      userName,
      rating,
      reviewText,
    } = req.body;

    const newReview = {
      userName: userName,
      rating: rating,
      text: reviewText,
    };

    const newMovie = new Movie({
      title: title,
      director: director,
      genre: genre,
      releaseYear: releaseYear,
      description: description,
      reviews: [newReview],
    });

    const savedMovie = await newMovie.save();
    res.status(200).json(savedMovie);
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};

const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const { title, director, genre, releaseYear, description, userName, rating, reviewText } = req.body;

    const updatedMovie = await Movie.findByIdAndUpdate(movieId, {
      title: title,
      director: director,
      genre: genre,
      releaseYear: releaseYear,
      description: description,
      reviews: [
        {
          userName: userName,
          rating: rating,
          text: reviewText
        }
      ]
    }, { new: true });

    if (!updatedMovie) {
      return res.status(404).send("Movie not found");
    }

    res.status(200).json(updatedMovie); // Or render a success page

  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating the movie");
  }
};



const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByIdAndDelete(id);
    if (!movie) {
      return res
        .status(404)
        .json({ message: `cannot find any movie with ID ${id}` });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
