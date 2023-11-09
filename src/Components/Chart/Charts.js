import React, {useEffect, useState} from 'react';
import "./Charts.css";

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
            label: 'Temperature (°C)',
            data: [],
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
        },
        {
            label: 'Humidity (%)',
            data: [],
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
        },
        {
            label: 'Light (%)',
            data: [],
            borderColor: 'rgb(184,75,192, 1)',
            backgroundColor: 'rgba(184,75,192, 0.2)',
        },
    ],
};
const Charts = ({data}) => {
    // const temp = [31, 20, 12, 45, 22, 30, 27, 32, 1, 17, 7, 39, 37, 15, 16, 41, 5, 20, 29, 15, 33, 9, 45, 13, 28, 17, 11, 7, 2, 38]
    // const hum = [80, 82, 63, 57, 86, 42, 78, 61, 74, 40, 50, 85, 77, 87, 89, 88, 54, 75, 70, 85, 54, 53, 64, 44, 54, 69, 71, 79, 41, 66]
    // const light = [411, 419, 422, 407, 441, 529, 527, 428, 488, 417, 480, 370, 466, 300, 502, 510, 456, 396, 367, 597, 369, 337, 543, 577, 361, 560, 566, 377, 487, 571]
    const [chart, setChart] = useState(initialData);

    let chartData = {
        labels: Array.from({length: 30}, (_, i) => (i + 1).toString()),
        datasets: [
            {
                label: 'Temperature (°C)',
                data: data.temperature,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
            },
            {
                label: 'Humidity (%)',
                data: data.humidity,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
            },
            {
                label: 'Light (%)',
                data: data.light,
                borderColor: 'rgb(184, 75, 192, 1)',
                backgroundColor: 'rgba(184, 75, 192, 0.2)',
            },
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

export default Charts;
