import React, { useState, useEffect } from 'react';
import regression, { DataPoint } from 'regression';
import { Data } from '../types';

export interface TrendingProps {
  fetchedData: Data[];
}

const Trending: React.SFC<TrendingProps> = ({ fetchedData }) => {
  const [isTrending, setIsTrending] = useState<boolean | null>(null);
  const [trendVal, setTrendVal] = useState('');
  const [min, setMin] = useState<Data | null>(null);
  const [max, setMax] = useState<Data | null>(null);

  /**
   * Helper function to store the min and max data points
   */
  const findMinAndMax = (data: Data[]) => {
    data.forEach(dataPoint => {
      const current = dataPoint.amount;

      // Store min data point
      if (!min || parseFloat(min.amount) > parseFloat(current)) {
        setMin(dataPoint);
      }

      // Store max data point
      if (!max || parseFloat(max.amount) < parseFloat(current)) {
        setMax(dataPoint);
      }
    });
  };

  /**
   * Helper function to get a set trend using linear regression
   */
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

  // Recalculate trend, min, and max everytime data is updated
  useEffect(() => {
    findTrend(fetchedData);
    findMinAndMax(fetchedData);
  }, [fetchedData]);

  return (
    <div className="trending">
      <h3 className={isTrending ? 'up' : 'down'}>
        <img
          className={isTrending ? 'up' : 'down'}
          src={
            isTrending
              ? 'https://img.icons8.com/ios-glyphs/30/000000/sort-up.png'
              : 'https://img.icons8.com/ios-glyphs/30/000000/sort-down.png'
          }
          alt="Trending arrow"
        />
        {isTrending ? ` +${trendVal}` : ` ${trendVal}`}
      </h3>
      <hr />
      <div className="high-low">
        <div className="high">
          <h4>HIGH</h4>
          <p>
            {max
              ? `$${max.amount} at ${max.timestamp.toLocaleTimeString()}`
              : 'Loading'}
          </p>
        </div>
        <div className="low">
          <h4>LOW</h4>
          <p>
            {min
              ? `$${min.amount} at ${min.timestamp.toLocaleTimeString()}`
              : 'Loading'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Trending;
