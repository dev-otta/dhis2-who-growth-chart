import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartDataTypes } from '../../../types/chartDataTypes';


export const GrowthChartBuilder = ({ dataSetValues, dataSetMetadata, xLabelValues, keysDataSet }: ChartDataTypes) => {
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map(key => ({
            data: dataSetValues.map(entry => entry[key]),
            borderWidth: 0.9,
            borderColor: 'black',
        })),
    };

    const options = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: `age (${dataSetMetadata.unit})` } },
            y: { title: { display: true, text: dataSetMetadata.yaxis } },
        },
    };

    return <Line data={data} options={options} />;
};
