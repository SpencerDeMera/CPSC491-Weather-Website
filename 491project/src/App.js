import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { useEffect, useState } from 'react';
import { getLocation } from './pages/utils/process';
import { getGeoReverseCodeData } from './pages/utils/search';

export default function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [unitsSystem, setUnitsSystem] = useState(null);

  useEffect(() => {
    const load = async () => {
      const location = await getLocation();
      const details = await getGeoReverseCodeData(location);

      setCurrentLocation({
        id: 0,
        name: details.name,
        state: details.state,
        country: details.country,
        lat: location.lat,
        lon: location.lon
      });
      
      // Set unit system based on location
      if (details.country === 'US') {
        setUnitsSystem('imperial');
      } else {
        setUnitsSystem('metric');
      }
    }

    load();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header setUnitsSystem={setUnitsSystem}/>
      </header>

      <section>
        <Sidebar setCurrentLocation={setCurrentLocation} />
        <Body currentLocation={currentLocation} unitsSystem={unitsSystem}/>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}
