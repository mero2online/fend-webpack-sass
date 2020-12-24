var path = require('path');
const express = require('express');
const mockAPIResponse = require('./mockAPI.js');
const fetch = require('node-fetch');
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();

// Personal API Key for MeaningCloud API
const apiKey = process.env.API_KEY;

app.use(express.static('dist'));

console.log(__dirname);

app.get('/', function (req, res) {
  res.sendFile('dist/index.html');
});

const port = process.env.PORT || 8082;

// designates what port the app will listen to for incoming requests
app.listen(port, function () {
  console.log(
    `Example app listening on port ${port}!`,
    `http://localhost:${port}/`
  );
});

app.get('/test', function (req, res) {
  res.send(mockAPIResponse);
});

// POST Route
app.post('/coordinateData', coordinateData);

async function coordinateData(req, res) {
  console.log('post req.body', req.body);
  let cooData = req.body;
  lat = cooData.lat;
  lon = cooData.lon;

  console.log('lat val', lat);
  console.log('lon val', lon);
  // Base URL for OpenWeatherMap API to optain current weather data by ZIP code
  let baseURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=`;
  let apiURL = baseURL + apiKey;
  const response = await fetch(apiURL);
  const mcData = await response.json();
  console.log(mcData);
  res.send(mcData);
}
