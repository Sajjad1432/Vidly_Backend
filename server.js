const config = require("config");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bp = require("body-parser");

if (!config.has("jwtPrivateKey")) {
  console.log("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}
// Routes files
const courses = require("./routes/courses");
const home = require("./routes/home");
const customers = require("./routes/customers");
const genres = require("./routes/geners");
const rentals = require("./routes/rentals");
const movies = require("./routes/movies");
const users = require("./routes/users");
const auth = require("./routes/auth");

// Connection with mongodb
mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected ot MongoDB...."))
  .catch((err) => console.log("Could not connect with MongoDB...", error));

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
// routes
app.use("/api/customers", customers);
app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/genres", genres);
app.use("/api/rentals", rentals);
app.use("/api/movies", movies);
app.use("/api/users", users);
app.use("/api/auth", auth);
// configuration
console.log("Application Name" + config.get("name"));
console.log("Mail Server Name" + config.get("mail.host"));
// console.log("Mail Password" + config.get("mail.password"));

// to set adding a piece of middleware
// Built in Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Third party Middleware
app.use(helmet());

// To check the environment of the application
// by default Node environment
// NODE_ENV ->  UNDEFINED
// we can also check it by app.get('env);
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
  console.log("Morgan is enabled");
}

// Set View Engine to view HTML in node
app.set("view engine", "pug");
app.set("views", "./views"); //default

app.use(logger);
app.use(function (req, res, next) {
  console.log("Authenticating.....");
  next();
});

// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
