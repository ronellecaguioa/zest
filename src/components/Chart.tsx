import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import { Data } from '../types';
import '../stylesheets/Chart.scss';

export interface ChartProps {
  fetchedData: Data[];
  min: Data | null;
  max: Data | null;
}

const Chart: React.FC<ChartProps> = ({ fetchedData, min, max }) => {
  const [yAxis, setYAxis] = useState<number[]>([]);
  const [xAxis, setXAxis] = useState<string[]>([]);
  const [start, setStart] = useState<string>('');

  // On new props, store fetchedData in local state
  useEffect(() => {
    setYAxis(fetchedData.map(d => parseFloat(d.amount)));
    setXAxis(fetchedData.map(d => d.timestamp.toLocaleTimeString()));

    if (fetchedData.length && start.length !== 0) {
      setStart(fetchedData[0].timestamp.toLocaleTimeString());
    }
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
        font: {
          color: 'black',
          size: 15,
          family: 'BlinkMacSystemFont',
        },
        xaxis: {
          nticks: 3,
          title: {
            text: 'Time',
          },
          showline: true,
          tick0: start,
        },
        yaxis: {
          range: [
            min ? parseFloat(min.amount) - 500 : 0,
            max ? parseFloat(max.amount) + 500 : 20000,
          ],
          showline: true,
          title: {
            text: 'Value (USD)',
          },
          nticks: 4,
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
