const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

const getAllMovies = async (req, res) => {
  // console.log("Getting all movies");
  const result = await mongodb.getDb().db().collection("movies").find();
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists);
  });
};

const getMovieById = async (req, res) => {
  // console.log("Getting movie by ID");
  const movieId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .find({ _id: movieId });
  result.toArray().then((lists) => {
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(lists[0]);
  });
};

const addMovie = async (req, res) => {
  // console.log("Add movie to inventory");
  const movie = {
    title: req.body.title,
    rating: req.body.rating,
    yearReleased: req.body.yearReleased,
    duration: req.body.duration,
    format: req.body.format,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .insertOne(movie);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while adding a movie.");
  }
};

const updateMovie = async (req, res) => {
  // console.log("Update movie information by ID");
  const movieId = new ObjectId(req.params.id);
  const movie = {
    title: req.body.title,
    rating: req.body.rating,
    yearReleased: req.body.yearReleased,
    duration: req.body.duration,
    format: req.body.format,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .replaceOne({ _id: movieId }, movie);
  if (response.acknowledged) {
    res.status(204).json(response);
  } else {
    res
      .status(500)
      .json(response.error || "An error occurred while update the movie.");
  }
};

const deleteMovie = async (req, res) => {
  // console.log("Delete movie from inventory");
  const movieId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db()
    .collection("movies")
    .deleteOne({ _id: movieId }, true);
  if (response.acknowledged) {
    res.status(200).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || "An error occurred while trying to delete the movie."
      );
  }
};

module.exports = {
  getAllMovies,
  getMovieById,
  addMovie,
  updateMovie,
  deleteMovie,
};
