//import express and path packages
const express = require("express");
const path = require("path");

//set up express router
const router = express.Router();

//import model

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
