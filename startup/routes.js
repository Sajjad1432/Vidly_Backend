const express = require("express");
const courses = require("../routes/courses");
const home = require("../routes/home");
const customers = require("../routes/customers");
const genres = require("../routes/geners");
const rentals = require("../routes/rentals");
const movies = require("../routes/movies");
const users = require("../routes/users");
const auth = require("../routes/auth");
const error = require("../middleware/error");

module.exports = function (app) {
  app.use(express.json());
  app.use("/api/customers", customers);
  app.use("/api/courses", courses);
  app.use("/", home);
  app.use("/api/genres", genres);
  app.use("/api/rentals", rentals);
  app.use("/api/movies", movies);
  app.use("/api/users", users);
  app.use("/api/auth", auth);
  app.use(error);
};
