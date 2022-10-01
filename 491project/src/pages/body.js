import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import '../App.css';
import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';
import { getWeatherData } from './utils/ingest';

export default function Body({coords}) {
    const [weatherInfo, setWeatherInfo] = useState(null);
    const [aqiInfo, setAqiInfo] = useState(null);
    
    // Async load function for getting and setting weather data
    window.onload = async () => {
        let weatherData = await getWeatherData(coords);
        setWeatherInfo(weatherData);
        let aqiData = await getWeatherData(coords);
        setAqiInfo(aqiData);
    }

    // ===== DEBUG ===== 
    console.log(weatherInfo);
    console.log(aqiInfo);

    const {lat, lon} = coords;

    if (weatherInfo) {
        return (
            <div className="showcase">
                <div className="content">
                    <div className="main-body">
                        <div className="container-fluid mt-4">
                            <div className="row d-flex">
                                <div className="col-sm-6 mainBox">
                                    <Conditions />
                                </div>
                                <div className="col-sm-6">
                                    <Locations />
                                </div>
                                <div className="col-sm-12">
                                    <Activities />
                                </div>
                                <div className="col-sm-12">
                                    <Details />
                                </div>
                                <div className="col-sm-12">
                                    <Forecasts />
                                </div>
                                <h3>**TESTING** Lat: {lat} | Lon: {lon}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    } else {
        return (
            <p>Loading Data...</p>
        );
    }
}