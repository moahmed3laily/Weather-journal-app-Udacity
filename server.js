// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
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

PORT = 3000 || process.env.PORT;

app.listen(PORT, ()=>{
    console.log(`app is listening on port ${PORT}`)
})

// get data from the user 
const postData = (req,res)=> {
    projectData = {
        temp:req.body.temp,
        date:req.body.date,
        feelings:req.body.feelings
    };
    res.send(projectData).status(200) 
}
// app Get and Post requests

app.get('/getData', (req,res)=>{
    res.send(projectData).status(200);
});
    
app.post('/postAllData',postData)