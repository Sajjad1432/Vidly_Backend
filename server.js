const winston = require("winston");
const express = require("express");
const bp = require("body-parser");
const app = express();

// Connection with mongodb
require("./startup/db")();

// Routes of the application
require("./startup/routes")(app);

// Handling Error(::Commenting this line because getting issue with winston-mongodb version issue)
// require("./startup/logging")();

// Configuration of Application
require("./startup/config")();

// validation of the application
require("./startup/validation")();

app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
// Port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => winston.info(`App listening on port ${PORT}`));
