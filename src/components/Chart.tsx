import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Data } from '../types';

export interface ChartProps {
  fetchedData: Data[];
}

const Chart: React.FC<ChartProps> = ({ fetchedData }) => {
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [I, setI] = useState(0);
  const [J, setJ] = useState(20000);

  // On new props, store fetchedData in local state
  useEffect(() => {
    setYAxis(fetchedData.map(d => parseFloat(d.amount)));
    setXAxis(fetchedData.map(d => d.timestamp.toLocaleTimeString()));
  }, [fetchedData]);

  const customAxis = () => {
    setI(12300);
    setJ(12400);
  };

  return (
    <div>
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
          autosize: true,
          xaxis: {
            nticks: 5,
          },
          yaxis: {
            range: [I, J],
          },
        }}
        config={{
          scrollZoom: true,
          showLink: true,
        }}
        useResizeHandler
      />
      <button onClick={customAxis} type="button">
        set axis
      </button>
    </div>
  );
};

export default Chart;
