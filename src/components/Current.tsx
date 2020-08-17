import React from 'react';
import { Data } from '../types';

export interface CurrentProps {
  current: Data;
}

const Current: React.FC<CurrentProps> = ({ current }) => {
  return (
    <div className="current">
      <h3>LAST</h3>
      <hr />
      <div>
        {current ? (
          <>
            {/* <div>Base: {current.base}</div> */}
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
};

export default Current;
