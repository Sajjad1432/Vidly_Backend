const express = require("express");
const app = express();
const logger = require("./middleware/logger");
const helmet = require("helmet");
const morgan = require("morgan");
const config = require("config");
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/playground")
  .then(() => {
    console.log("Connected ot MongoDB....");
  })
  .catch((err) => {
    console.log("Could not connect with MongoDB...", error);
  });

// Built-in Validator in mongoose
// For String we have : min, max, enum, required, type
// For Numbers : min, max, required

// Schema Type  validation
// for String: lowerCase ,uppercase,trim
// for Numbers : get, set

// Schema Define the shape of course schema
const courseSchema = new mongoose.Schema({
  // validate some values in mongoose by just setting them required
  name: { type: String, required: true, lowercase: true, trim: true },
  author: String,
  tags: [String],
  category: {
    type: String,
    required: true,
    enum: ["web", "mobile", "network"],
  },
  tags: {
    type: Array,
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    get: (v) => Math.round(v),
    set: (v) => Math.round(v),
  },
});

// Modal of Course Schema
const Course = mongoose.model("Course", courseSchema);

// CRUD
// Create Course
async function createCourse() {
  const course = new Course({
    name: "Node Js Course",
    author: "Sajjad Ali",
    category: "mobile",
    tags: ["node"],
    isPublished: true,
    price: 14.78273,
  });

  // Save object in database
  try {
    const result = await course.save();
    console.log("Result", result);
  } catch (error) {
    console.log(error.message);
  }
}

createCourse();

// Get Course/ Read Course
async function getCourses() {
  const pageNumber = 2;
  const pageSize = 3;

  // const courses = Course.find();
  // Try to implement more filters on it : Filter all those records which have Sajjad Ali as a author

  // Comparison Operator
  // eq(equal)
  // ne(not equal)
  // gt(greater than)
  // gte(greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  //nin (not in)

  // Logical Operator
  // or
  // and

  // Regular Expression
  // this is the expression to write a query for regular express
  // $ indicate the end of expression
  // find the author which contains Sajjad
  // .find({author:/^Sajjad/})

  // If we only have to count the values of an array just use the method Count
  // .count();

  // Pagination
  // skip method is used for pagination

  const courses = await Course.find({
    // price: { $gt: 10, $lte: 20 },
    author: "Sajjad Ali",
    isPublished: true,
  })
    // .or([{ author: "Sajjad" }, { isPublished: true }])

    .skip((pageNumber - 1) * pageSize)
    .limit(pageNumber)
    .sort({ name: 1 })
    // .select({ name: 1, tags: 1 });
    .count();
  console.log("🚀 ~ file: server.js ~ line 45 ~ getCourses ~ courses", courses);
}

// createCourse();
// getCourses();

// Update Course
// async function updateCourse(id) {
//   const course = await Course.findById(id);
//   if (!course) return;
//   course.isPublished = true;
//   course.author = "Sajjad Ali";

//   const result = await course.save();
//   console.log(
//     "🚀 ~ file: server.js ~ line 107 ~ updateCourse ~ result",
//     result
//   );
// }
async function updateCourse(id) {
  const result = await Course.update(
    { _id: id },
    {
      $set: {
        author: "Sajju",
        isPublished: false,
      },
    }
  );

  console.log(
    "🚀 ~ file: server.js ~ line 107 ~ updateCourse ~ result",
    result
  );
}

// updateCourse("629119fe0754fd1bc347a6de");

// Remove/Delete Course
async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  // const course = await Course.findByIdAndRemove(id);
  console.log(
    "🚀 ~ file: server.js ~ line 138 ~ deleteCourse ~ result",
    result
  );
}

// removeCourse("62911a03b8dcb4dde9fae6a5");
const courses = require("./routes/courses");
const home = require("./routes/home");
const genres = require("./routes/geners");

// routes
app.use("/api/courses", courses);
app.use("/", home);
app.use("/api/genres", genres);

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
