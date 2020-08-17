import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Data } from '../types';

export interface ChartProps {
  fetchedData: Data[];
}

const Chart: React.FC<ChartProps> = ({ fetchedData }) => {
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);

  // On new props, store fetchedData in local state
  useEffect(() => {
    setYAxis(fetchedData.map(d => parseFloat(d.amount)));
    setXAxis(fetchedData.map(d => d.timestamp.toLocaleTimeString()));
  }, [fetchedData]);

  return (
    <div className="chart">
      <h2>Chart Component</h2>
      <Plot
        data={[
          {
            x: xAxis,
            y: yAxis,
            type: 'scatter',
            fill: 'tozeroy',
          },
        ]}
        layout={{
          title: 'Bitcoin Prices',
          xaxis: {
            nticks: 5,
          },
          yaxis: {},
        }}
      />
    </div>
  );
};

export default Chart;
