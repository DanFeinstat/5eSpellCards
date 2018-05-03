//import express and path packages
const express = require("express");
const path = require("path");
const model = require("../models/spellCard.js");

//set up express router
const router = express.Router();

//import model

router.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

router.get("/register", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/register.html"));
});

router.get("/login", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

router.post("/api/register", function(req, res) {
  model.newUser(req.body.user_name, req.body.user_password, function(result) {
    //   model.newUser("postman", "testword", function(result) {
    res.status(200).json({ message: "new user" });
  });
});

router.get("/api/register", function(req, res) {
  model.testGetter("users", function(result) {
    res.send(result);
  });
});
module.exports = router;
