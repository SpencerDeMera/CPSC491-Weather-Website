import axios from 'axios';
import { format } from 'date-fns';
import { getAqiInfo, processWeatherAlertData, processPlacesData, processEventsData } from './process';

const BASE_URL = 'http://localhost:4000';

export const getWeatherData = async (currentLocation, unitSystem) => {
  try {
    const params = {
      lat: currentLocation.lat,
      lon: currentLocation.lon,
      units: unitSystem
    }
    const response = await axios.get(`${BASE_URL}/weather`, { params });
    return response.data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getAQIData = async (currentLocation) => {
  try {
    const dateFormat = format(new Date(), 'yyyy-MM-dd');
    const params = {
      format: 'application/json',
      latitude: currentLocation.lat,
      longitude: currentLocation.lon,
      date: dateFormat,
      distance: 25
    }
    const response = await axios.get(`${BASE_URL}/airquality`, { params });
    const result = getAqiInfo(response.data);
    return result;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getWeatherAlertData = async (currentLocation) => {
  // TODO: Consider WeatherBit API to get alerts in EU and Israel
  try {
    const response = await axios.get(`${BASE_URL}/alerts?lat=${currentLocation.lat}&lon=${currentLocation.lon}`)
    const result = processWeatherAlertData(response.data, 3)
    
    if (result.length) return result
    return null;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getTodoData = async (currentLocation, radius_meter) => {
  var todo = []
  const places = await getPlacesData(currentLocation, radius_meter);
  const processed_places = processPlacesData(places);

  // Get events if not enough places
  if (processed_places.length < 5) {
    const events = await getEventsData(currentLocation, 5 - processed_places.length);
    const processed_events = processEventsData(events.events);
    
    todo = processed_events
  }

  const finalTodo = [...todo, ...processed_places]

  return finalTodo;
}

export const getPlacesData = async (currentLocation, radius_meter) => {
  try {
    const params = {
      filter: `circle:${currentLocation.lon},${currentLocation.lat},${radius_meter}`,
      categories: 'activity,entertainment,leisure,natural,national_park,tourism,camping,amenity',
      conditions: 'access',
      lang: 'en',
      limit: 5
    }
    const response = await axios.get(`${BASE_URL}/places`, { params });
    return response.data;
  } catch (err) {
    console.log(`ERROR: ${err.message}`);
  }

  return null;
}

export const getEventsData = async (currentLocation, limit) => {
  try {
    const now = new Date();
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const timestamp = startOfDay / 1000;
    const params = {
      latitude: currentLocation.lat,
      longitude: currentLocation.lon,
      start_date: timestamp,
      sort_on: 'popularity',
      sort_by: 'desc',
      limit: limit
    }
    const response = await axios.get(`${BASE_URL}/events`, { params });
    return response.data;
  } catch (error) {
    console.log(`ERROR: ${error.message}`);
  }
}