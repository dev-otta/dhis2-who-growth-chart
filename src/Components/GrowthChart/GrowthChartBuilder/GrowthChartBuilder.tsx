import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';


interface ChartData {
    datasets: {
        [key: string]: {
            [key: string]: number;
        }[];
    };
    metadata: {
        label: string;
        value: string;
        yaxis: string;
        xaxis: string;
    }[];
}

interface GrowthChartBuilderProps {
    chartData?: ChartData;
}

export const GrowthChartBuilder = ({ chartData }: GrowthChartBuilderProps) => {
    const dataSetData = chartData.datasets.Girls0to5Years
    const dataSetMetadata = chartData.metadata[0]
    const TimeInterval = Object.keys(dataSetData);

    const Keys = Object.keys(dataSetData[0]);
    const percentileKeys = Keys.slice(1, Keys.length);

    const data = {
        labels: TimeInterval,
        datasets: percentileKeys.map((percentileKey) => ({
            label: percentileKey,
            data: dataSetData.map((entry) => entry[percentileKey]),
            fill: false,
            borderWidth: 0.9,
            borderColor: 'black',
        })),
    };

    const options = {
        elements: {
            point: {
                radius: 0,
                hoverRadius: 0,
            },
        },
        plugins: {
            legend: {
                display: false,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: dataSetMetadata.xaxis,
                },
            },
            y: {
                title: {
                    display: true,
                    text: dataSetMetadata.yaxis,
                },
            },
        },
    };

    return (
        <div>
            <Line data={data} options={options} />
        </div>
    );

};
