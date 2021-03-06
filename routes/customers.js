const { Customer, validateCustomer } = require("../models/cutomer"); //.customer
const express = require("express");
const router = express.Router();

// Get All Customers
router.get("/", async (req, res) => {
  const customers = await Customer.find().sort("name");
  res.send(customers);
});

// Create new Customer

router.post("/", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = new Customer({
    isGold: req.body.isGold,
    name: req.body.name,
    phone: req.body.phone,
  });
  await customer.save();
  res.send(customer);
});

router.put("/:id", async (req, res) => {
  const { error } = validateCustomer(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { name: req.body.name },
    { new: true }
  );
  if (!customer)
    return res
      .status(404)
      .send("The Customer with the given ID was not found.");
  res.send(customer);
});

router.delete("/:id", async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer)
    return res
      .status(404)
      .send("The customer with the given ID was not found.");
  res.send(customer);
});

module.exports = router;
