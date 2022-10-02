const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AQI_URL = 'http://api.openweathermap.org/data/2.5/air_pollution/history?';
// const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];

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
    var date = new Date();
    var start = Math.floor(date.getTime() / 1000.0) - 3600;
    date = new Date();
    var end = Math.floor(date.getTime() / 1000.0);

    const oneCallURL = `${AQI_URL}lat=${location.lat}&lon=${location.lon}&start=${start}&end=${end}&appid=${OpenWeatherAPI_KEY}`;
    const oenCallResponse = await fetch(oneCallURL); // fetches repsonse from API call and places into repsonse
    var oneCallResult = await oenCallResponse.json(); // converts json to result variable
    
    if (oenCallResponse.ok) { // if response is ok
        return oneCallResult;
    } else {
        return oneCallResult = null; // else if repsonse !ok return result as null
    }
}