import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';
import { setCurrLocationFlag } from './pages/utils/process';

function App() {
  const [currLocation, setCurrLocation] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>

      <section>
        <Sidebar locationCoords={currLocation} setCurrLocation={setCurrLocation}/>

        <Body locationCoords={currLocation} setCurrLocation={setCurrLocation}/>
      </section>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default App;
