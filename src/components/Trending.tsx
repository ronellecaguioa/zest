import React, { useState, useEffect } from 'react';
import regression, { DataPoint } from 'regression';
import { Data } from '../types';

export interface TrendingProps {
  fetchedData: Data[];
}

const Trending: React.SFC<TrendingProps> = ({ fetchedData }) => {
  const [isTrending, setIsTrending] = useState<boolean | null>(null);
  const [trendVal, setTrendVal] = useState('');

  const findTrend = (data: Data[]) => {
    // Use 'amount' property from each data point
    const tempList = data.map((c, i): DataPoint => [i, parseFloat(c.amount)]);

    // Use linear regression
    const result = regression.linear(tempList);

    // Parse out 'm' from 'y = mx + b'
    const slope = result.string.split(' ')[2];
    const slopeNum = parseFloat(slope.slice(0, slope.length - 1));

    setIsTrending(slopeNum >= 0);
    setTrendVal(slopeNum.toFixed(2));
  };

  useEffect(() => {
    findTrend(fetchedData);
  }, [fetchedData]);

  return (
    <div className="trending">
      <h2>Trending {isTrending ? `UP ${trendVal}` : `DOWN ${trendVal}`}</h2>
      <div>
        <p>High: _placeholder</p>
        <p>Low: _placeholder</p>
      </div>
    </div>
  );
};

export default Trending;
