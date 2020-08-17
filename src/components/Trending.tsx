import React from 'react';

export interface TrendingProps {}

const Trending: React.SFC<TrendingProps> = props => {
  return (
    <div className="trending">
      <h2>Trending UP</h2>
      <div>
        <p>High: _placeholder</p>
        <p>Low: _placeholder</p>
      </div>
    </div>
  );
};

export default Trending;
