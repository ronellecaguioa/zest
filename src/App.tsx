import React, { useState, useEffect } from 'react';

import Chart from './components/Chart';
import Trending from './components/Trending';
import Current from './components/Current';
import { Data } from './types';
import './stylesheets/index.scss';

const App: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Data[]>([]);

  // Fetched bitcoin data from coinbase API
  const fetchData = () => {
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
      .then(res => res.json())
      .then(({ data }: { data: Data }) => {
        data.timestamp = new Date();
        setFetchedData(state => state.concat([data]));
      })
      .catch(error => console.log('You have an error', error));
  };

  // On mount, fetches data from coinbase API every 5 seconds
  useEffect(() => {
    fetchData(); // Avoid initial 5 second delay
    setInterval(fetchData, 5000);
  }, []);

  return (
    <div className="app">
      <header>
        <h1>Bitcoin Prices</h1>
      </header>
      <main>
        <div className="chart">
          <Chart fetchedData={fetchedData} />
        </div>
        <div className="metrics">
          <Trending fetchedData={fetchedData} />
          <Current current={fetchedData[fetchedData.length - 1]} />
        </div>
      </main>
    </div>
  );
};

export default App;
