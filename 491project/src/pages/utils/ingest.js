import axios from 'axios';
import { format } from 'date-fns';
import { 
  getCurrentInfo, getAqiInfo, 
  processWeatherZoneUrl, processWeatherZone, processWeatherAlertData
} from './process';

const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AQINOW_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';
const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const NWS_URL = 'https://api.weather.gov';

const KEYS = require('../../keys.json')
const ONECALL_KEY = KEYS[0]['key'];
const AQINOW_KEY = KEYS[1]['key'];

export const getWeatherData = async (currentLocation, unitSystem) => {
  try {
    const response = await axios.get(`${ONECALL_URL}lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unitSystem}&appid=${ONECALL_KEY}`);
    const processed_data = getCurrentInfo(response.data);
    return processed_data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getAQIData = async (currentLocation) => {
  try {
    const dateFormat = format(new Date(), 'yyyy-MM-dd');
    const response = await axios.get(`${AQINOW_URL}&latitude=${currentLocation.lat}&longitude=${currentLocation.lon}&date=${dateFormat}&distance=25&API_KEY=${AQINOW_KEY}`);
    const result = getAqiInfo(response.data);
    return result;
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