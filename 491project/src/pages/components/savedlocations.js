export default function SavedLocations({ savedLocations, setCurrentLocation }) {
  const handleSelect = (index) => {
    setCurrentLocation(savedLocations[index])
  };
  
  return (
    <div className="saved-area">
      <div className="saved-title">
          <p>Saved Locations</p>
      </div>

      {savedLocations && savedLocations.map((location, index) => 
          <div key={index} className="saved-locs" onClick={() => handleSelect(index)} >
              <a className="locationName">{location.name}</a>
              <a className="locationSub">{location.state}, {location.country}</a>
          </div>
      )}
    </div>
  )
}