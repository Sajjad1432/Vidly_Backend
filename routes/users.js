const _ = require("lodash");
const { User, validateUser } = require("../models/user"); //.USER
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const config = require("config");

// Get All USERs
router.get("/", async (req, res) => {
  const users = await User.find().sort("name");
  res.send(users);
});

// Create new USER

router.post("/", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (user) return res.status(400).send("This email already registered!");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  const token = user.generateAuthToken();

  //  setting of header in response
  res
    .header("x-auth-token", token)
    .send(_.pick(user, ["_id", "name", "email"]));
});

router.put("/:id", async (req, res) => {
  const { error } = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!user)
    return res.status(404).send("The USER with the given ID was not found.");
  res.send(user);
});

router.delete("/:id", async (req, res) => {
  const user = await User.findByIdAndRemove(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

router.get("/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user)
    return res.status(404).send("The user with the given ID was not found.");
  res.send(user);
});

module.exports = router;
