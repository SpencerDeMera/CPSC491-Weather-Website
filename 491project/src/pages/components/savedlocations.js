import { useState } from 'react';

export default function SavedLocations({ savedLocations, setCurrentLocation, defaultLocation, currentLocation }) {
  const [selectedLocation, setSelectedLocation] = useState({name: 'NA', country: 'NA'});

  const handleSelect = (index, name, country) => {
    setSelectedLocation({
      name: name, country: country,
    });
    setCurrentLocation(savedLocations[index])
  };
  
  return (
    <div className="saved-area">
      <div className="saved-title">
        <p>Saved Locations</p>
      </div>
      
      <div className="saved-area-mobile">
        {savedLocations && savedLocations.map((location, index) => 
          <div key={index} className="saved-locs" onClick={() => handleSelect(index, location.name, location.country)} >
            <div className="saved-locs-inner">
              {selectedLocation.name === location.name && selectedLocation.country === location.country && currentLocation.lat !== defaultLocation.lat && currentLocation.lon !== defaultLocation.lat
                ? <>
                    <a className="locationName" style={{color: 'crimson'}}>{location.name}</a>
                    {location.state && 
                      <a className="locationSub" style={{color: 'crimson'}}>{location.state}, {location.country}</a>
                    }
                    {!location.state &&
                      <a className="locationSub" style={{color: 'crimson'}}>{location.country}</a>
                    }
                  </>
                : <>
                    <a className="locationName">{location.name}</a>
                    {location.state && 
                      <a className="locationSub">{location.state}, {location.country}</a>
                    }
                    {!location.state &&
                      <a className="locationSub">{location.country}</a>
                    }
                  </>
              }
            </div>
            <div className="locDelete-body">
              <span className="locDelete-icon fa-solid fa-xmark"/>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
