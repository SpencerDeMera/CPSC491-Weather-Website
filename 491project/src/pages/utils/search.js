import axios from 'axios';

const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const GEOCODEREV_URL = 'https://api.openweathermap.org/geo/1.0/reverse?';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];

export const getGeoCodeData = async (cityName) => {
	try {
		const response = await axios.get(`${GEOCODE_URL}q=${cityName}&limit=5&appid=${OpenWeatherAPI_KEY}`);
		return response.data;
	} catch (err) {
		console.log(`ERROR: ${err.message}`);
	}

	return null;
}

export const getGeoReverseCodeData = async (location) => {
	try {
		const response = await axios.get(`${GEOCODEREV_URL}lat=${location.lat}&lon=${location.lon}&limit=1&appid=${OpenWeatherAPI_KEY}`);
		return response.data[0];
	} catch (err) {
		console.log(`ERROR: ${err.message}`);
	}

	return null;
}