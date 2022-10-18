import SearchBox from "./components/searchbox";
import ResultArea from "./components/resultarea";
import SavedLocations from "./components/savedlocations";
import { getGeoCodeData } from "./utils/search";
import { useEffect, useState } from 'react';

export default function Sidebar({ currentLocation, setCurrentLocation }) {
  const [searchValue, setSearchValue] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [savedLocations, setSavedLocations] = useState(
    JSON.parse(localStorage.getItem('savedLocations')) || []
  );

  useEffect(() => {
    localStorage.setItem('savedLocations', JSON.stringify(savedLocations));
  }, [savedLocations]);

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