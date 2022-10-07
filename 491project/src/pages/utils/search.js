const GEOCODE_URL = 'https://api.openweathermap.org/geo/1.0/direct?';
const GEOCODEREV_URL = 'https://api.openweathermap.org/geo/1.0/reverse?';

let data = require('../../keys.json');
const OpenWeatherAPI_KEY = data[0]['key'];

export const getGeoCodeData = async (cityName) => {
    const geoCodeURL = `${GEOCODE_URL}q=${cityName}&limit=5&appid=${OpenWeatherAPI_KEY}`;
    const geoCodeResponse = await fetch(geoCodeURL);
    var geoCodeResult = await geoCodeResponse.json();

    let geoDataArr = [];
    for (var i = 0; i < geoCodeResult.length; i++) {
        geoDataArr.push(geoCodeResult[i]);
    }

    return geoDataArr;
}

export const getGeoReverseCodeData = async (location) => {
    const geoCodeURL = `${GEOCODEREV_URL}lat=${location.lat}&lon=${location.lon}&limit=1&appid=${OpenWeatherAPI_KEY}`;
    const geoCodeResponse = await fetch(geoCodeURL);
    var geoCodeResult = await geoCodeResponse.json();

    return geoCodeResult[0];
}

var locationArray;

export const setLocationData = (geoCodeData) => { locationArray = geoCodeData; }

export const getLocationData = () => { return locationArray; }