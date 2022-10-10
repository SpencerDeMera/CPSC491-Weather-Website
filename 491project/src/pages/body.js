import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';
import ReactLoading from 'react-loading';
import { format } from 'date-fns';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAqiInfo, getCurrentInfo, getUvi } from './utils/process';

const KEYS = require('../keys.json')
const ONECALL_URL = 'https://api.openweathermap.org/data/2.5/onecall?';
const AQINOW_URL = 'https://www.airnowapi.org/aq/observation/latLong/current/?format=application/json';
const ONECALL_KEY = KEYS[0]['key'];
const AQINOW_KEY = KEYS[1]['key'];

export default function Body({ currentLocation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const unitsSystem = 'imperial';
      try {
        const response = await axios.get(`${ONECALL_URL}lat=${currentLocation.lat}&lon=${currentLocation.lon}&units=${unitsSystem}&appid=${ONECALL_KEY}`);
        const processed_data = getCurrentInfo(response.data);
        setWeatherData(processed_data);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
      }
    }

    const fetchAqiData = async () => {
      try {
        const dateFormat = format(new Date(), 'yyyy-MM-dd');
        const response = await axios.get(`${AQINOW_URL}&latitude=${currentLocation.lat}&longitude=${currentLocation.lon}&date=${dateFormat}&distance=25&API_KEY=${AQINOW_KEY}`);
        const result = getAqiInfo(response.data)
        setAqiData(result);
      } catch (err) {
        console.log(`ERROR: ${err.message}`);
      }
    }
    
    fetchWeatherData();
    fetchAqiData();
  }, [currentLocation]);

  return (
    <div className="showcase">
        <div className="content">
          <div className="main-body">
            {!currentLocation &&
              <ReactLoading type={'spinningBubbles'} color={'#56BFB5'} height={200} width={200} />
            }
            {currentLocation && weatherData &&
              <div className="container-fluid mt-4">
                <div className="row d-flex">
                  <Conditions
                    weatherData={weatherData}
                  />
                  <Locations />
                  <Activities />
                  <Details
                    aqiData={aqiData}
                    uviData={weatherData.daily}
                    minutelyData={weatherData.minutely}
                  />
                  <Forecasts />
                </div>
              </div>
            }
          </div>
        </div>
    </div>

  );
}