import React from 'react';
import i18n from '@dhis2/d2-i18n'
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';


export const GrowthChartBuilder = ({ dataSetValues, dataSetMetadata, xLabelValues, keysDataSet, optionsObject }: ChartDataTypes) => {
    Chart.register(CategoryScale, annotationPlugin);

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
                annotations: optionsObject.annotations
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
