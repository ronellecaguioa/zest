import React from 'react';
import { Data } from '../types';

export interface CurrentProps {
  current: Data;
}

/**
 * Presentational component for display the latest data point
 */
const Current: React.FC<CurrentProps> = ({ current }) => (
  <div className="current">
    <h3>LAST</h3>
    <hr />
    <div>
      {current ? (
        <>
          <div>
            <span>Amount: </span>
            <span>${current.amount}</span>
          </div>
          <div>
            <span>Time: </span>
            <span>{current.timestamp.toLocaleTimeString()}</span>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </div>
  </div>
);

export default Current;
