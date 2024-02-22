import React from 'react';
import i18n from '@dhis2/d2-i18n'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';


export const GrowthChartBuilder = ({ dataSetValues, dataSetMetadata, xLabelValues, keysDataSet }: ChartDataTypes) => {
    Chart.register(CategoryScale, annotationPlugin);

    const annotations: any = [];

    xLabelValues.forEach((label, index) => {
        if (label % 12 === 0 && label != 0) {

            annotations.push({
                display: true,
                type: 'line',
                mode: 'vertical',
                scaleID: 'x',
                value: label,
                label: {
                    display: true,
                    content: () => {
                        const value = index / 12
                        if(value == 1) return value + ' Year'
                        return value + ' Years'
                    },
                    position: 'start',
                    yAdjust: -10,
                },
                
            })
        }
    });

    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map(key => ({
            data: dataSetValues.map(entry => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
        })),
    };

    const options = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: {
            annotation: {
                annotations: annotations
            },
            legend: { display: false }
        },
        scales: {
            x: { title: { display: true, text: i18n.t(`age (${dataSetMetadata.unit})`) } },
            y: { title: { display: true, text: dataSetMetadata.yaxis } },
        },
    };
    console.log(Chart)
    return <Line data={data} options={options} />;
};
