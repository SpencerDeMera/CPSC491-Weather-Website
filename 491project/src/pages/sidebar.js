import SearchBox from "./searchbox";
import ResultArea from "./resultarea";
import SavedLocations from "./savedlocations";
import { getGeoCodeData } from "./utils/search";
import { useEffect, useState } from 'react';

const Sidebar = ({ currentLocation, setCurrentLocation }) => {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []);

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  });

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await getGeoCodeData(searchValue);
      setSearchResults(response);
      setSearchValue('');
    } catch (err) {
      console.log(`ERROR: ${err.message}`);
    }
  };

  return (
    <div className="sidebar">
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSubmit={handleSubmit}
        />
        <ResultArea
          searchResults={searchResults}
          setSearchResults={setSearchResults}
          savedLocations={savedLocations}
          setSavedLocations={setSavedLocations}
          setCurrentLocation={setCurrentLocation}
        />
        
        <div className="sidebar-divider" />

        <SavedLocations
          savedLocations={savedLocations}
          setCurrentLocation={setCurrentLocation}
        />
    </div>
  )
}

export default Sidebar