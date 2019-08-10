import React from 'react';
import Today from './Today/Today';
import History from './History/History'
import './App.css';

function App() {
  return (
    <div className="App">
      <div className="topHeader">
        <header className="container">
          <nav className="navbar">
            <div className="navbar-brand">
              <span className="navbar-item">Pusher Coin</span>
            </div>
            <div className="navbar-end">
              <a className="navbar-item" href="https://pusher.com" target="_blank" rel="noopener noreferrer">Pusher.com</a>
            </div>
          </nav>
        </header>
      </div>
      <section className="results--section">
        <div className="container">
          <h1>PusherCoins is a realtime price information about<br></br> BTC, ETH and LTC.</h1>
        </div>
        <div className="result--section_inner">
          <Today />
          <History />
          {/* #Todo, implement Today and History components */}
        </div>
      </section>
    </div>
  );
}

export default App;
