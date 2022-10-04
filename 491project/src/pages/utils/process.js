var currLocation = true;
var newLat;
var newLon;
var weatherInfo;
var aqiInfo;

export const setLocation = (flag) => {
    if (flag) {
        currLocation = true;
    } else if (!flag) {
        currLocation = false;
    }
}

export const getCurrLocationFlag = () => { return currLocation; }

export const setCoords = (lat, lon) => {
    newLat = lat;
    newLon = lon;
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
            let data = {'lat':  newLat, 'lon': newLon};
            resolve(data);
        });
    }
};

export const setWeather = (weatherData) => { weatherInfo = weatherData; }

export const setAqi = (aqiData) => { aqiInfo = aqiData; }

export const getCurrentInfo = () => {
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

export const getUvi = () => {
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

export const getAqiInfo = () => {
    let aqi = aqiInfo.list[0];

    let ozone = aqiCalc((aqi.components.o3 * 0.001), 'o3') * 100;
    let fine = aqiCalc((aqi.components.pm2_5 * 0.1), 'pm2_5') * 10;
    let coarse = aqiCalc((aqi.components.pm10), 'pm10');
    let overall_hi = aqiCalc((aqi.main.aqi), 'overall');
    let overall = (overall_hi + ozone + fine + coarse) / 4;
    
    return {
        overall: overall,
        ozone: ozone,
        fine: fine,
        coarse: coarse,
    }
}

const aqiCalc = (conc_i, type) => {
    var conc_lo;
    var conc_hi;
    var aqi_lo;
    var aqi_hi;

    if (type === 'o3') {
        if (conc_i <= 0.054) {
            conc_lo = 0.000;
            conc_hi = 0.054;
            aqi_lo = 0;
            aqi_hi = 50;
        } else if (conc_i >= 0.055 && conc_i <= 0.070) {
            conc_lo = 0.055;
            conc_hi = 0.070;
            aqi_lo = 51;
            aqi_hi = 100;
        } else if (conc_i >= 0.071 && conc_i <= 0.085) {
            conc_lo = 0.071;
            conc_hi = 0.085;
            aqi_lo = 101;
            aqi_hi = 150;
        } else if (conc_i >= 0.086 && conc_i <= 0.105) {
            conc_lo = 0.086;
            conc_hi = 0.105;
            aqi_lo = 151;
            aqi_hi = 200;
        } else if (conc_i >= 0.106 && conc_i <= 0.200) {
            conc_lo = 0.106;
            conc_hi = 0.200;
            aqi_lo = 201;
            aqi_hi = 300;
        }
    } else if (type === 'pm2_5') {
        if (conc_i <= 12.0) {
            conc_lo = 0.0;
            conc_hi = 12.0;
            aqi_lo = 0;
            aqi_hi = 50;
        } else if (conc_i >= 12.1 && conc_i <= 35.4) {
            conc_lo = 12.1;
            conc_hi = 35.4;
            aqi_lo = 51;
            aqi_hi = 100;
        } else if (conc_i >= 35.5 && conc_i <= 55.4) {
            conc_lo = 35.5;
            conc_hi = 55.4;
            aqi_lo = 101;
            aqi_hi = 150;
        } else if (conc_i >= 55.5 && conc_i <= 150.4) {
            conc_lo = 55.5;
            conc_hi = 150.4;
            aqi_lo = 151;
            aqi_hi = 200;
        } else if (conc_i >= 150.5 && conc_i <= 250.4) {
            conc_lo = 150.5;
            conc_hi = 250.4;
            aqi_lo = 201;
            aqi_hi = 300;
        } else if (conc_i >= 250.5 && conc_i <= 500.4) {
            conc_lo = 250.5;
            conc_hi = 500.4;
            aqi_lo = 301;
            aqi_hi = 500;
        }
    } else if (type === 'pm10') {
        if (conc_i <= 54.99) {
            conc_lo = 0.0;
            conc_hi = 54.99;
            aqi_lo = 0;
            aqi_hi = 50;
        } else if (conc_i >= 55.0 && conc_i <= 154.99) {
            conc_lo = 55.0;
            conc_hi = 154.99;
            aqi_lo = 51;
            aqi_hi = 100;
        } else if (conc_i >= 155.0 && conc_i <= 254.99) {
            conc_lo = 155.0;
            conc_hi = 254.99;
            aqi_lo = 101;
            aqi_hi = 150;
        } else if (conc_i >= 255.0 && conc_i <= 354.99) {
            conc_lo = 255.0;
            conc_hi = 354.99;
            aqi_lo = 151;
            aqi_hi = 200;
        } else if (conc_i >= 355.0 && conc_i <= 424.99) {
            conc_lo = 355.0;
            conc_hi = 424.99;
            aqi_lo = 201;
            aqi_hi = 300;
        } else if (conc_i >= 425.0 && conc_i <= 604.99) {
            conc_lo = 425.0;
            conc_hi = 604.99;
            aqi_lo = 301;
            aqi_hi = 500;
        }
    } else if (type ==='overall') {
        if (conc_i === 1) {
            return 50;
        } else if (conc_i === 2) {
            return 100;
        } else if (conc_i === 3) {
            return 150;
        } else if (conc_i === 4) {
            return 200;
        } else if (conc_i === 5) {
            return 300;
        }
    }

    return ((aqi_hi - aqi_lo) / (conc_hi - conc_lo)) * (conc_i - conc_lo) + aqi_lo;
}