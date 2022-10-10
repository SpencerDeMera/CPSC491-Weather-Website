import Sun2 from '../assets/images/dataIcons/sun2.png';
import Precip2 from '../assets/images/dataIcons/precip2.png';
import Sunrise2 from '../assets/images/dataIcons/sunrise2.png';
import Wind2 from '../assets/images/dataIcons/wind2.png';
import Clouds2 from '../assets/images/dataIcons/clouds2.png';
import Sunset2 from '../assets/images/dataIcons/sunset2.png';

const Conditions = ({ weatherData }) => {
  const iconURL = `https://openweathermap.org/img/wn/${weatherData.weather_icon}@2x.png`;

  return (
    <div className="col-sm-6 mainBox">
      <div className="card main-card">
          <div className="card-body">
              <div className="primary-conditions">
                  <img src={iconURL} className="weather-icon-curr" alt="..." />
                  <div className="current-temp-data">
                      <p className="conditions">{weatherData.weather_main}</p>
                      <p className="temp">{Math.round(weatherData.temp)} °F</p>
                      <p className="feels-like">Feels Like {Math.round(weatherData.feels_like)} °F</p>
                  </div>
              </div>
              <div className="sub-conditions-cards">
                  <div className="sub-cards">
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Sun2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{Math.round(weatherData.uvi)}</p>
                              <p className="condition-description">UV Index</p>
                          </div>
                      </div>
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Precip2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{Math.round(weatherData.precip)} %</p>
                              <p className="condition-description">Precipitation</p>
                          </div>
                      </div>
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Sunset2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{weatherData.sunrise}</p>
                              <p className="condition-description">Sunrise</p>
                          </div>
                      </div>
                  </div>
                  <div className="sub-cards">
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Wind2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{Math.round(weatherData.wind_speed)} mph</p>
                              <p className="condition-description">Wind Speed</p>
                          </div>
                      </div>
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Clouds2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{weatherData.clouds} %</p>
                              <p className="condition-description">Cloud Cover</p>
                          </div>
                      </div>
                      <div className="card shadow-sm">
                          <img className="detail-icon" src={Sunrise2} alt=""/>
                          <div className="sub-conditions-details">
                              <p className="condition-value">{weatherData.sunset}</p>
                              <p className="condition-description">Sunset</p>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
    </div>
  )
}

export default Conditions