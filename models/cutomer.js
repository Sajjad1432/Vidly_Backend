const mongoose = require("mongoose");
const Joi = require("joi");

// Schema
const customerSchema = new mongoose.Schema({
  isGold: { type: Boolean, required: true, default: false },
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: String,
    required: true,
    minlength: 13,
    maxlength: 15,
  },
});
const Customer = mongoose.model("Customer", customerSchema);

function validateCustomer(customer) {
  const schema = {
    isGold: Joi.boolean().required(),
    name: Joi.string().min(5).required(),
    phone: Joi.string().min(13).max(15).required(),
  };

  return Joi.validate(customer, schema);
}

module.exports.Customer = Customer;
module.exports.validateCustomer = validateCustomer;
