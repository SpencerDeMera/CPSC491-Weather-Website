import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { useState } from 'react';

function App() {
  const [currentLocation, setCurrentLocation] = useState({
    "id": 0,
    "name": "CSUF",
    "state": "California",
    "country": "US",
    "lat": 33.88,
    "lon": -117.88,
  });

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
