import axios from 'axios';
import { format } from 'date-fns';
import { getAqiInfo, processWeatherZoneUrl, processWeatherZone, processWeatherAlertData, processPlacesData } from './process';

const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AQINOW_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';
const NWS_URL = 'https://api.weather.gov';
const GEOAPIFY_URL = 'https://api.geoapify.com/v2';

const KEYS = require('../../keys.json')
const ONECALL_KEY = KEYS[0]['key'];
const AQINOW_KEY = KEYS[1]['key'];
const GEOAPIFY_KEY = KEYS[2]['key'];

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
  // Getting weather alerts requires getting the weather zone url first
  // Then, get the zone from the weather zone url
  // Finally, get the alerts using the zone
  // TODO: Consider WeatherBit API to get alerts in EU and Israel
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

export const getTodoData = async (currentLocation, radius_meter) => {
  // TODO: Add events query here
  const places = await getPlacesData(currentLocation, radius_meter);
  const processed_places = processPlacesData(places);

  return processed_places;
}

export const getPlacesData = async (currentLocation, radius_meter) => {
  try {
    const params = {
      filter: `circle:${currentLocation.lon},${currentLocation.lat},${radius_meter}`,
      categories: 'activity,entertainment,leisure,natural,national_park,tourism,camping,amenity',
      conditions: 'access',
      lang: 'en',
      limit: 5,
      apiKey: GEOAPIFY_KEY
    }
    const response = await axios.get(`${GEOAPIFY_URL}/places`, { params } );
    return response.data
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}