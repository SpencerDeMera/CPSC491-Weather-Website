const SavedLocations = ({ savedLocations, setCurrentLocation }) => {
  const handleSelect = (index) => {
    setCurrentLocation(savedLocations[index])
  };
  
  console.log(savedLocations);
  
  return (
    <div className="saved-area">
      <div className="saved-title">
          <p>Saved Locations</p>
      </div>

      {savedLocations && savedLocations.map((location, index) => 
          <div key={index} className="saved-locs" onClick={() => handleSelect(index)} >
              <a className="locationName">{location.name}</a>
              {location.state && 
                <a className="locationSub">{location.state}, {location.country}</a>
              }
              {!location.state &&
                <a className="locationSub">{location.country}</a>
              }
          </div>
      )}
    </div>
  )
}

export default SavedLocations