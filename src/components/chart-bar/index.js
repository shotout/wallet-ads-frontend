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
import { Bar, getElementsAtEvent, getElementAtEvent } from 'react-chartjs-2';

ChartJS?.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Index({ labels, datas, title }) {
  const [hover, setHover] = React.useState(null);
  const chartRef = React.useRef();

  let backgroundColor = [
    'rgba(156, 166, 255, 1)',
    'rgba(181, 234, 134, 1)',
    'rgba(192, 157, 250, 1)',
    'rgba(250, 117, 157, 1)',
  ];

  const options = {
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          title: function (tooltipItem, data) {
            return `${title}`;
          }, 
          //   label: function(tooltipItem, data) {
          //     return data['datasets'][0]['data'][tooltipItem['index']];
          //   },
          //   afterLabel: function(tooltipItem, data) {
          //     var dataset = data['datasets'][0];
          //     var percent = Math.round((dataset['data'][tooltipItem['index']] / dataset["_meta"][0]['total']) * 100)
          //     return '(' + percent + '%)';
          //   }
          // },
          // footer: hover,
        },
      },
    },
    
  };

  const data = {
    labels: labels,
    datasets: [
      {
        label: '',
        data: datas,
        backgroundColor,
        borderRadius: 8,
        barThickness: 50,
      },
    ],
    options: {
      scales: {
          y: {
              beginAtZero: false
          }
      }
  }
  };

  const changeColor = () => {
    console.log('changeColor');
  };

  const onMouseOver = (event) => {
    console.log(Math.random());
    setHover(Math.random());
    // const bar = getElementsAtEvent(chartRef.current, event);
    // const index = bar[0].index;
    // console.log(index);
    // console.log(bar);
    // backgroundColor.forEach((item, i) => {
    //   if (index === i) {
    //     backgroundColor[i] = 'red';
    //     console.log('sama');
    //   } else {
    //     console.log(i);
    //     backgroundColor[i] = 'red';
    //   }
    // });
  };

  const resetColor = () => {
    backgroundColor[0] = 'rgba(156, 166, 255, 1)';
    backgroundColor[1] = 'rgba(181, 234, 134, 1)';
    backgroundColor[2] = 'rgba(192, 157, 250, 1)';
    backgroundColor[3] = 'rgba(250, 117, 157, 1)';
  };

  return <Bar ref={chartRef} data={data} options={options} />;
}
