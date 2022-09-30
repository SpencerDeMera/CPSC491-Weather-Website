import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import Header from './pages/header';
import Sidebar from './pages/sidebar';
import Body from './pages/body';
import Footer from './pages/footer';

function App() {
  // ===== TESTING: Fullerton Coordinates ===== 
  var coords = {'lat': 33.870350, 'lon': -117.924301};
  // ===== TESTING: Fullerton Coordinates =====

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
