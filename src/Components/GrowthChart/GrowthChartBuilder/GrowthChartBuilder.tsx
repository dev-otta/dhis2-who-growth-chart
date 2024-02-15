import React from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData } from '../../../types/chartDataTypes';
import { useRangeTimePeriode } from './useRangeTimePeriode';
interface GrowthChartBuilderProps {
    chartData?: ChartData;
}

export const GrowthChartBuilder = ({ chartData }: GrowthChartBuilderProps) => {
    const dataSetName = Object.keys(chartData.datasets)[0];
    const dataSet = chartData.datasets[dataSetName];
    const dataSetMetadata = chartData.metadata[dataSetName];

    const xLabelValues = useRangeTimePeriode(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSet[0]);

    if ( xLabelValues.length !== dataSet.length ) {
        console.error('xLabelValues and dataSet should have the same length');
    }
    
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map((key) => ({
            data: dataSet.map((entry) => entry[key]),
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
                    text: `age (${dataSetMetadata.unit})`,
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
        <Line data={data} options={options} />
    );

};
