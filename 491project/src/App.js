import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Axios from 'axios';
import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';

function App() {
  // ===== TESTING: Fullerton Coordinates ===== 
  var coords = {'lat': 33.870350, 'lon': -117.924301};
  // ===== TESTING: Fullerton Coordinates =====

  // try {
  //   const weatherData = getWeatherData(coords);

  //   if (weatherData != null) {
  //     setWeatherInfo(weatherData);
  //   } else { // if weatherData == null -> error with API call
  //     setErrMssg(weatherData.message);
  //   }
  // } catch (err) {
  //   setErrMssg(err.message);
  //   console.log(errMssg);
  // }

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <section>
        <Sidebar />

        <Body coords={coords}/>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
