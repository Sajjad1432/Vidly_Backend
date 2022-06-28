const auth = require("../middleware/auth");
const admin = require("../middleware/admin");

// Just to make code formalize i will import model
//  from genre models where i define model and
//  schema for the genre
const { Genre, validateGenre } = require("../models/genre");
const express = require("express");
const router = express.Router();

// Get All Genres
router.get("/", async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

// Create new Genres
router.post("/", auth, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = new Genre({ name: req.body.name });
  await genre.save();
  res.send(genre);
});

// Update Genre
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// Delete Genre
router.delete("/:id", [auth, admin], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

// Get single Genre
router.get("/:id", async (req, res) => {
  const genre = await Genre.findById(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");
  res.send(genre);
});

module.exports = router;
