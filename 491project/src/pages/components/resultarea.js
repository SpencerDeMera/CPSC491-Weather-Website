export default function ResultArea({
  searchResults,
  setSearchResults,
  savedLocations,
  setSavedLocations,
  setCurrentLocation,
}) {
  const handleSelect = (index) => {
    const selectedLocation = searchResults[index];
    const sameLocation = savedLocations.filter(
      (item) =>
        item.name === selectedLocation.name &&
        item.lat === selectedLocation.lat &&
        item.lon === selectedLocation.lon
    );

    // Only add selected loc to saved loc if it doesn't already exist in saved loc
    if (sameLocation.length === 0) {
      const id = savedLocations.length
        ? savedLocations[savedLocations.length - 1].id + 1
        : 1;
      const newSavedLocation = {
        id: id,
        name: selectedLocation.name,
        state: selectedLocation.state,
        country: selectedLocation.country,
        lat: selectedLocation.lat,
        lon: selectedLocation.lon,
        parkCode: selectedLocation.parkCode,
      };

      const savedLocationList = [...savedLocations, newSavedLocation];

      // If above limit, delete the earliest saved location
      if (savedLocationList.length > 5) {
        savedLocationList.shift();
      }

      setSavedLocations(savedLocationList);
      setCurrentLocation(newSavedLocation);
    }

    setSearchResults([]);
  };

  return (
    <div className="results-area">
      {searchResults &&
        searchResults.map((location, index) => (
          <div className="search-results" key={index}>
            <div
              className="search-results-inner"
              key={index}
              onClick={() => handleSelect(index)}
            >
              <a className="locationName">{location.name}</a>
              {location.state && (
                <a className="locationSub">
                  {location.state}, {location.country}
                </a>
              )}
              {!location.state && (
                <a className="locationSub">{location.country}</a>
              )}
            </div>
          </div>
        ))}
      {/* handle if no search results */}
    </div>
  );
}
