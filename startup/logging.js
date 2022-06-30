const winston = require("winston");
require("winston-mongodb");
require("express-async-errors");
module.exports = function () {
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }),
    new winston.transports.File({ filename: "uncaughtExceptions.log" })
  );

  winston.add(new winston.transports.File({ filename: "logfile.log" }));
  winston.add(
    new winston.transports.MongoDB({
      db: "mongodb://localhost:27017/vidly",
      level: "info",
    })
  );
};
