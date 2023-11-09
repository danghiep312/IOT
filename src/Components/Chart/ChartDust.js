import React, {useEffect, useState} from 'react';
import "./ChartDust.css";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from "chart.js";
import {Line} from "react-chartjs-2";

ChartJS.register(CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const initialData = {
    labels: Array.from({length: 30}, (_, i) => (i + 1).toString()),
    datasets: [
        {
            label: 'Dust',
            data: [],
            borderColor: 'rgba(255,255,0,0.94)',
            backgroundColor: 'rgba(255,255,1,0.25)',
        }
    ],
};
const ChartDust = ({data}) => {
    const [chart, setChart] = useState(initialData);

    let chartData = {
        labels: Array.from({length: 30}, (_, i) => (i + 1).toString()),
        datasets: [
            {
                label: 'Dust',
                data: data.dust,
                borderColor: 'rgba(255,255,0,0.94)',
                backgroundColor: 'rgba(255,255,1,0.25)',
            }
        ],
    };


    const options = {

        responsive: true,
        plugins: {
            legend: {
                position: "top",
            },
        },
    };
    return (<div className="chart">
        <Line data={chartData} options={options} height={320} width={600}/>
    </div>);
}

export default ChartDust;
