// jshint esversion: 6
// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
app.listen(port, ()=>{
  console.log(`server started at port ${port}`);
});

// setup the post route to receive weather data object
app.post("/postData", (req, res)=>{
  projectData = req.body;
  res.send(req.body);
});

// setup the get route to weather data object
app.get("/postData", (req, res)=>{
  res.send(projectData);
});
