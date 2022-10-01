import React from 'react';
import ReactDOM from 'react-dom';
import '../../App.css';
import currIcon from '../assets/images/OpenWeatherSunny.png';
import Sun2 from '../assets/images/dataIcons/sun2.png';
import Precip2 from '../assets/images/dataIcons/precip2.png';
import Sunrise2 from '../assets/images/dataIcons/sunrise2.png';
import Wind2 from '../assets/images/dataIcons/wind2.png';
import Clouds2 from '../assets/images/dataIcons/clouds2.png';
import Sunset2 from '../assets/images/dataIcons/sunset2.png';

export default function Conditions() {
    return (
        <div className="card main-card">
            <div className="card-body">
                <div className="primary-conditions">
                    <img src={currIcon} className="weather-icon-curr" alt="..." />
                    <div className="current-temp-data">
                        <p className="conditions">Clear Sky</p>
                        <p className="temp">67 °F</p>
                        <p className="feels-like">Feels Like 65 °F</p>
                    </div>
                </div>
                <div className="sub-conditions-cards">
                    <div className="sub-cards">
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Sun2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value">4</p>
                                <p className="condition-description">UV Index</p>
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Precip2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value">12 %</p>
                                <p className="condition-description">Precipitation</p>
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Sunrise2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value">6:50 PM</p>
                                <p className="condition-description">Sunset</p>
                            </div>
                        </div>
                    </div>
                    <div className="sub-cards">
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Wind2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value">13 mph</p>
                                <p className="condition-description">Wind Speed</p>
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Clouds2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value"> 23 %</p>
                                <p className="condition-description">Cloud Cover</p>
                            </div>
                        </div>
                        <div className="card shadow-sm">
                            <img className="detail-icon" src={Sunset2} alt=""/>
                            <div className="sub-conditions-details">
                                <p className="condition-value">6:37 AM</p>
                                <p className="condition-description">Sunrise</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}