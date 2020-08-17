import React from 'react';
import { Data } from '../types';

export interface CurrentProps {
  current: Data;
}

const Current: React.FC<CurrentProps> = ({ current }) => {
  return (
    <div>
      <h3>Current</h3>
      <div>
        {current ? (
          <>
            <div>Base: {current.base}</div>
            <div>Amount: ${current.amount}</div>
            <div>Timestamp: {current.timestamp.toLocaleTimeString()}</div>
          </>
        ) : (
          <div>Loading</div>
        )}
      </div>
    </div>
  );
};

export default Current;
