var currLocation = true;
var newLat;
var newLon;
var weatherInfo;
var aqiInfo;

export const setCurrLocationFlag = (flag) => {
    if (flag) {
        currLocation = true;
    } else if (!flag) {
        currLocation = false;
    }

    console.log('Set Current Location Flag to: ' + currLocation);
    localStorage.setItem('currLocationFlag', currLocation);
}

export const getCurrLocationFlag = () => { 
    const flag = localStorage.getItem('currLocationFlag');
    console.log('Current Location Flag is: ' + flag);

    return flag; 
}

export const setCoords = (lat, lon) => {
    newLat = lat;
    newLon = lon;

    const data = { lat: newLat, lon: newLon };

    console.log('Set Current Location Coords to: ');
    console.log(data);
    localStorage.setItem('selectedLocation', JSON.stringify(data));
}

export const getCoords = () => { 
    console.log('Grabbing Current Location Coords: ');
    const data = JSON.parse(localStorage.getItem('selectedLocation'));
    console.log(data);

    return data; 
}

export const getLocation = async () => {
    if (currLocation) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition((position) => {
                let tempLat = position.coords.latitude;
                let tempLon = position.coords.longitude;
    
                let data = {'lat': tempLat, 'lon': tempLon};
                resolve(data);
            }, () => {
                reject('ERROR');
                alert('Snippet Needs Your Location');
            }); 
        });
    } else {
        return new Promise((resolve, reject) => {
            resolve(getCoords());
        });
    }
}

export const setWeather = (weatherData) => { weatherInfo = weatherData; }

export const setAqi = (aqiData) => { aqiInfo = aqiData; }

export const getCurrentInfo = (weatherInfo) => {
    let curr = weatherInfo.current;
    let day = weatherInfo.daily[0];

    let sunriseTime = new Date(curr.sunrise * 1000);
    sunriseTime = sunriseTime.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'});
    let sunsetTime = new Date(curr.sunset * 1000);
    sunsetTime = sunsetTime.toLocaleTimeString('default', {hour: '2-digit', minute: '2-digit'});

    return {
        dt: curr.dt,
        sunrise: sunriseTime,
        sunset: sunsetTime,
        temp: curr.temp,
        feels_like: curr.feels_like,
        pressure: curr.pressure,
        humidity: curr.humidity,
        dew_point: curr.dew_point,
        uvi: curr.uvi,
        clouds: curr.clouds,
        precip: day.pop,
        visibility: curr.visibility,
        wind_speed: curr.wind_speed,
        wind_deg: curr.wind_deg,
        weather_id: curr.weather[0].id,
        weather_main: curr.weather[0].main,
        weather_descritpion: curr.weather[0].description,
        weather_icon: curr.weather[0].icon,
    }
}

export const getMinutely = () => { return weatherInfo.minutely; }

export const getHourly = () => {
    let hours = weatherInfo.hourly;
    let hoursData = [];

    for (let i = 0; i < 48; i++) {
        hoursData.push({
            dt: hours[i].dt,
            temp: hours[i].temp,
            feels_like: hours[i].feels_like,
            pressure: hours[i].pressure,
            humidity: hours[i].humidity,
            dew_point: hours[i].dew_point,
            uvi: hours[i].uvi,
            clouds: hours[i].clouds,
            precip: hours[i].pop,
            visibility: hours[i].visibility,
            wind_speed: hours[i].wind_speed,
            wind_deg: hours[i].wind_deg,
            wind_gust: hours[i].wind_gust,
            weather_id: hours[i].weather[0].id,
            weather_main: hours[i].weather[0].main,
            weather_description: hours[i].weather[0].description,
            weather_icon: hours[i].weather[0].icon,
        });
    }

    return hoursData;
}

export const getDaily = () => {
    let days = weatherInfo.daily;
    let daysData = [];

    for (let i = 0; i < 8; i++) {
        daysData.push({
            dt: days[i].dt,
            sunrise: days[i].sunrise,
            sunset: days[i].sunset,
            moonrise: days[i].moonrise,
            moonset: days[i].moonset,
            moon_phase: days[i].moon_phase,
            temp_day: days[i].temp.day,
            temp_min: days[i].temp.min,
            temp_max: days[i].temp.max,
            temp_night: days[i].temp.night,
            temp_eve: days[i].temp.eve,
            temp_morn: days[i].temp.morn,
            feels_like_day: days[i].feels_like.day,
            feels_like_night: days[i].feels_like.night,
            feels_like_eve: days[i].feels_like.eve,
            feels_like_morn: days[i].feels_like.morn,
            pressure: days[i].pressure,
            humidity: days[i].humidity,
            dew_point: days[i].dew_point,
            uvi: days[i].uvi,
            clouds: days[i].clouds,
            precip: days[i].pop,
            wind_speed: days[i].wind_speed,
            wind_deg: days[i].wind_deg,
            wind_gust: days[i].wind_gust,
            weather_id: days[i].weather[0].id,
            weather_main: days[i].weather[0].main,
            weather_description: days[i].weather[0].description,
            weather_icon: days[i].weather[0].icon,
        });
    }

    return daysData;
}

export const getUvi = (weatherInfo) => {
    let days = weatherInfo.daily;
    let uviData = [];

    for (let i = 0; i < 8; i++) {
        uviData.push({
            dt: days[i].dt,
            uvi: days[i].uvi,
        });
    }

    return uviData;
}

export const getAqiInfo = (aqiInfo) => {
    var ozone = null;
    var pm2_5 = null;
    var pm10 = null;

    // For each current AQI forecast
    for (let i = 0; i < aqiInfo.length; i++) {
        if (aqiInfo[i].ParameterName === "O3") {
            ozone = aqiInfo[i].AQI;
        } else if (aqiInfo[i].ParameterName === "PM2.5") {
            pm2_5 = aqiInfo[i].AQI;
        } else if (aqiInfo[i].ParameterName === "PM10") {
            pm10 = aqiInfo[i].AQI;
        }
    }

    return {
        overall: (ozone + pm2_5 + pm10) / 3,
        ozone: ozone,
        fine: pm2_5,
        coarse: pm10,
    }
}

export const processWeatherZoneUrl = (pointData) => {
  return pointData.properties.county;
}

export const processWeatherZone = (zoneData) => {
  return zoneData.properties.id;
}

export const processWeatherAlertData = (alertData) => {
  const features = alertData.features;
  var data = [];
  
  for (let i = 0; i < features.length; i++) {
    data.push({
      "event": features[i].properties.event,
      "effDate": features[i].properties.effective,
      "text": features[i].properties.parameters.NWSheadline[0],
      "instruction": features[i].properties.instruction
    });
  }

  return data;
}
