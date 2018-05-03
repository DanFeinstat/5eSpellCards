//import packages
const express = require("express");
const bodyParser = require("body-parser");

//set dynamic port
const PORT = process.env.PORT || 8080;

//set express app
const app = express();

//serve static content fro the app from the "public" directory
app.use(express.static("public"));

//parse application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Import routes and give the server access to them
const routes = require("./controllers/spellCard_controller.js");

app.use(routes);

//set up app listening
app.listen(PORT, function() {
  console.log("App now listening at localhost:" + PORT);
});
