const mongoose = require("mongoose");
const Joi = require("Joi");
const jwt = require("jsonwebtoken");

// Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
    maxlength: 255,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  isAdmin: Boolean,
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    { _id: this._id, isAdmin: this.isAdmin },
    "jwtPrivateKey"
  );
  return token;
};
const User = mongoose.model("User", userSchema);

function validateUser(user) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
  };

  return Joi.validate(user, schema);
}

module.exports.User = User;
module.exports.validateUser = validateUser;
