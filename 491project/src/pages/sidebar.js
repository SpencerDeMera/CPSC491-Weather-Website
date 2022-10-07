import React, { useState } from 'react';
import '../App.css';
import { getGeoCodeData, setLocationData, getLocationData } from './utils/search';
import { setCurrLocationFlag, setCoords, getCoords } from './utils/process';

export default function Sidebar({ locationCoords, onLocationChange }) {
    // ===== DEBUG =====
    const [cities, setCities] = useState([
        { name: 'Pomona', country: 'US', state: 'California' },
        { name: 'Fullerton', country: 'US', state: 'California' },
        { name: 'Long Beach', country: 'US', state: 'California' },
    ]);
    // ===== DEBUG =====

    const [locationName, sendLocation] = useState('');
    const [geoData, setGeoData] = useState('');

    const handleSubmit = async event => {
        event.preventDefault(); // prevents page refresh

        const locDataArray = await getGeoCodeData(locationName);
        setLocationData(locDataArray);

        setGeoData(getLocationData());
        sendLocation('');
    };

    const handleSelect = (lat, lon) => {
        setCurrLocationFlag(false);
        setCoords(lat, lon);
        console.log(lat);
        onLocationChange(getCoords());
    }

    if (geoData !== null || geoData !== undefined) {
        return (
            <div className="sidebar">
                <div className="search-area">
                    <form className="input-group mb-3" onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            className="form-control form-control-sm" 
                            placeholder="Search" 
                            aria-label="Location Search" 
                            aria-describedby="button-addon2" 
                            onChange={event => sendLocation(event.target.value)}
                            value={locationName}
                        />
                        <button className="btn btn-outline-light" type="submit" id="button-addon2">
                            <span className="fa-solid fa-magnifying-glass"></span>
                        </button>
                    </form>
                </div>
    
                <div className="results-area">
                    {geoData && geoData.map((location, index) => 
                        <div key={index} className="search-results" onClick={() => handleSelect(location.lat, location.lon)}>
                            <a className="locationName">{location.name}</a>
                            <a className="locationSub">{location.state}, {location.country}</a>
                        </div>
                    )}
                </div>
    
                <div className="sidebar-divider"></div>
    
                <div className="saved-area">
                    <div className="saved-title">
                        <p>Saved Locations</p>
                    </div>
    
                    {cities && cities.map((city, index) => 
                        <div key={index} className="saved-locs">
                            <a className="locationName">{city.name}</a>
                            <a className="locationSub">{city.state}, {city.country}</a>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}