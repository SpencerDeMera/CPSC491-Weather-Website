import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { setLocation } from './pages/utils/process';

function App() {
  // ===== TESTING: Fullerton Coordinates ===== 
  // var coords = {'lat': 33.870350, 'lon': -117.924301};
  // ===== TESTING: Fullerton Coordinates =====

  const useCurrLocationFlag = true;
  setLocation(useCurrLocationFlag); // uses current location on load

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <section>
        <Sidebar />

        <Body />
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
