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
            {selectedLocation.name === location.name && selectedLocation.country === location.country && currentLocation.lat !== defaultLocation.lat && currentLocation.lon !== defaultLocation.lat
              ? <>
                  <a className="locationName" style={{color: '#F34E76'}}>{location.name}</a>
                  {location.state && 
                    <a className="locationSub" style={{color: '#F34E76'}}>{location.state}, {location.country}</a>
                  }
                  {!location.state &&
                    <a className="locationSub" style={{color: '#F34E76'}}>{location.country}</a>
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
        )}
      </div>
    </div>
  )
}
