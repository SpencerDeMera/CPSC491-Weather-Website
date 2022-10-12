import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { useState, useEffect } from 'react';
import { getLocation } from './pages/utils/process';

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const load = async () => {
      const location = await getLocation();
      setCurrentLocation({
        id: 0,
        name: "",
        state: "",
        country: "",
        lat: location.lat,
        lon: location.lon
      });
    }

    load();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <section>
        <Sidebar
          currentLocation={currentLocation}
          setCurrentLocation={setCurrentLocation}
        />
        <Body
          currentLocation={currentLocation}
        />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
