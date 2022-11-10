import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js/auto';
import { Bar, getElementsAtEvent } from 'react-chartjs-2';

ChartJS?.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Index({ labels, datas }) {
  const chartRef = React.useRef();
  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: datas,
        backgroundColor: [
          'rgba(156, 166, 255, 1)',
          'rgba(181, 234, 134, 1)',
          'rgba(192, 157, 250, 1)',
          'rgba(250, 117, 157, 1)',
        ],

        borderRadius: 8,
        barThickness: 50,
      },
    ],
  };

  const onClick = (event) => {
    console.log(getElementsAtEvent(chartRef.current, event));
  };
  // const {
  //     data,

  // } = props

  return <Bar ref={chartRef} data={data} options={options} onClick={onClick} />;
}
