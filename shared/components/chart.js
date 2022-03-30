import React, { useEffect, useRef } from 'react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line ,getElementAtEvent ,getDatasetAtEvent} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  ); 
  export const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: false,
        text: 'Chart.js Line Chart',
      },
    },
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
const Chart = (props) => {

  const cahrtRef = useRef();
  const data = {
    labels,
    datasets: props.data
  };

  useEffect(() => {
      const chart = cahrtRef.current;
      chart.update()
  });

  const handleClick = (event) => {
    let element = getElementAtEvent(cahrtRef.current, event)[0];
    let pointInfo = props.data[element['datasetIndex']];
    props.handleClick(pointInfo.label,pointInfo.data[element.index])
  }

  return (
    <Line ref={cahrtRef} options={options} data={data} onClick={handleClick} />
  )
}

export default Chart