import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Data } from '../types';
import '../stylesheets/Chart.scss';

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
        autosize: true,
        xaxis: {
          nticks: 5,
          title: {
            text: 'Time',
          },
        },
        yaxis: {
          range: [0, 20000],
          showline: true,
          title: {
            text: 'Value (USD)',
          },
        },
      }}
      config={{
        scrollZoom: true,
        showLink: true,
      }}
      useResizeHandler
      className="plot"
    />
  );
};

export default Chart;
