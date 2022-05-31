//This the file that runs the server for the whole backend.

//Npm modules that help run server
const express = require('express');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');

//File that contains all routes
const server_routes = require('./routes/routes');

//cors options that allow the client to communicate with the server.
const corsOptions = {
    origin: 'http://localhost:4305',
    credentials: true
}

//Dotenv helps connect the server file to the .env file which holds the applications sensitive data.
dotenv.config({path: path.join(__dirname, '.env')});

//Helps to give the server excess to cookies.
app.use(cookieParser());

//Helps to geve access to input field data that comes from the frontend.
app.use(bodyParser.urlencoded({ extended: false }));

//This enables the corsOptions that allow the frontend to make requests to server.
app.use(cors(corsOptions));

//Allows incoming requests to be captured in JSON format
app.use(express.json());

//Responsible for the routing to server controllers
app.use('/api/onTime', server_routes);

//The server port number
const PORT = process.env.PORT || '4306';

//Listens to requests on a sepecified port
app.listen(PORT, () => {
    console.log(`Server runnin on port: ${PORT}`);
});
