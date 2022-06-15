const express = require("express");
const Joi = require("joi");

const router = express.Router();

// Dummy Courses Array
const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
];
// Get All courses
router.get("/", (req, res) => {
  res.send(courses);
});

// Create a course
router.post("/", (req, res) => {
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.send(400).send(error);
  const course = {
    id: courses.length + 1,
    name: req.body.name,
  };
  courses.push(course);
  res.send(course);
});

// Update Course

router.put("/:id", (req, res) => {
  // Look up the course
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  //  if not exist
  if (!course)
    return res.status(404).send("The course with the given ID was not found!");
  // validate
  // if not valid return 400 bad request
  const { error } = validateCourse(req.body); // result.error
  if (error) return res.send(400).send(error);

  //   update course
  course.name = req.body.name;

  res.send(course);
});

//   Get single course
router.get("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found!");
  res.send(course);
});

// Delete a course
router.delete("/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course)
    return res.status(404).send("The course with the given ID was not found!");
  // delete
  const index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

// Validate course

function validateCourse(course) {
  const schema = {
    name: Joi.string().min(3).required(),
  };

  return Joi.validate(course, schema);
}
module.exports = router;
