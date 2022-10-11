const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AirNow_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];
const AirNowGovPI_KEY = data[1]['key'];

export const getWeatherData = async (currentLocation, unitSystem) => {
    try {
        const oneCallURL = `${ONECALL_URL}lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unitSystem}&appid=${OpenWeatherAPI_KEY}`;
        const oneCallResponse = await fetch(oneCallURL); // fetches repsonse from API call and places into repsonse
        const oneCallResult = await oneCallResponse.json(); // converts json to result variable
        
        return oneCallResult;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }

    return null;
}

export const getAQIData = async (currentLocation) => {
    const current = new Date();
    const dateFormat = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;

    try {
        const airNowURL = `${AirNow_URL}&latitude=${currentLocation.lat}&longitude=${currentLocation.lon}&date=${dateFormat}&distance=25&API_KEY=${AirNowGovPI_KEY}`;
        const airNowResponse = await fetch(airNowURL); // fetches repsonse from API call and places into repsonse
        const airNowResult = await airNowResponse.json(); // converts json to result variable
        
        return airNowResult;
    } catch (err) {
        console.log(`ERROR: ${err.message}`);
    }

    return null;
}