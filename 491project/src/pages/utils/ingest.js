import axios from 'axios';
import { format } from 'date-fns';
import { getAqiInfo, processWeatherZoneUrl, processWeatherZone, processWeatherAlertData } from './process';

const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AQINOW_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';
const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const NWS_URL = 'https://api.weather.gov';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];
const AirNowGovPI_KEY = data[1]['key'];

export const getWeatherData = async (currentLocation, unitSystem) => {
  try {
    const response = await axios.get(`${ONECALL_URL}lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unitSystem}&appid=${ONECALL_KEY}`);
    return response.data;
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

export const getWeatherAlertData = async (currentLocation) => {
  try {
    const resp_url = await axios.get(`${NWS_URL}/points/${currentLocation.lat},${currentLocation.lon}`)
    const result_url = await processWeatherZoneUrl(resp_url.data);
    const resp_zone = await axios.get(result_url);
    const result_zone = await processWeatherZone(resp_zone.data);
    const resp_alert = await axios.get(`${NWS_URL}/alerts/active?zone=${result_zone}`)
    const result = processWeatherAlertData(resp_alert.data)
    
    if (result.length) return result
    return null;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}