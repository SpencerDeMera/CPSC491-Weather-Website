import Conditions from './components/conditions';
import Locations from './components/locations';
import Activities from './components/activities';
import Details from './components/details';
import Forecasts from './components/forecasts';
import ReactLoading from 'react-loading';
import { useEffect, useState } from 'react';
import { getAQIData, getWeatherData } from './utils/ingest';

export default function Body({ currentLocation }) {
  const [weatherData, setWeatherData] = useState(null);
  const [aqiData, setAqiData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      const newWeatherData = await getWeatherData(currentLocation, 'imperial');
      setWeatherData(newWeatherData);
    };

    const fetchAqiData = async () => {
      const newAqiData = await getAQIData(currentLocation);
      setAqiData(newAqiData)
    };
    
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