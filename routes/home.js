const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("index", { title: "Sajjad ALI", message: "How are you?" });
});

module.exports = router;
