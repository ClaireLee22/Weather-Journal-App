// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const bodyParser = require('body-parser')
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000;
const server = app.listen(port, listening);
function listening() {
    console.log(`running on localhost: ${port}`)
}

// GET route: get projectData object via route /all
app.get("/allData", function(request, response){
    response.send(projectData);
})

// POST route: send data to project's endpoint, projectData, via route /add
app.post("/addData", function(req, res) {
    projectData = {
        temp: req.body.temp,
        date: req.body.date,
        userResponse: req.body.userResponse
    }
    console.log(projectData);
})