import React, { useState, useEffect } from 'react';

import Chart from './components/Chart';
import Trending from './components/Trending';
import Current from './components/Current';
import './stylesheets/index.scss';

interface Data {
  base: string;
  currency: string;
  amount: string;
  timestamp: Date;
}

const App: React.FC = () => {
  const [fetchedData, setFetchedData] = useState<Data[]>([]);

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
  }, [fetchedData]);

  return (
    <div className="app">
      <main>
        <div>
          <Chart />
        </div>
        <div>
          <Trending />
          <Current />
        </div>
      </main>
    </div>
  );
};

export default App;
