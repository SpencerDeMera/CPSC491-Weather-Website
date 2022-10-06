const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AirNow_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';
// const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];
const AirNowGovPI_KEY = data[1]['key'];

let unitsSystem = 'imperial'; // defaults to imperial

export const getWeatherData = async (location) => {
    const oneCallURL = `${ONECALL_URL}lat=${location.lat}&lon=${location.lon}&units=${unitsSystem}&appid=${OpenWeatherAPI_KEY}`;
    const oenCallResponse = await fetch(oneCallURL); // fetches repsonse from API call and places into repsonse
    var oneCallResult = await oenCallResponse.json(); // converts json to result variable
    
    if (oenCallResponse.ok) { // if response is ok
        return oneCallResult;
    } else {
        return oneCallResult = null; // else if repsonse !ok return result as null
    }
}

export const getAQIData = async (location) => {
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    const airNowURL = `${AirNow_URL}&latitude=${location.lat}&longitude=${location.lon}&date=${year}-${month}-${day}&distance=25&API_KEY=${AirNowGovPI_KEY}`;
    const airNowResponse = await fetch(airNowURL); // fetches repsonse from API call and places into repsonse
    var airNowResult = await airNowResponse.json(); // converts json to result variable
    
    if (airNowResponse.ok) { // if response is ok
        return airNowResult;
    } else {
        return airNowResult = null; // else if repsonse !ok return result as null
    }
}