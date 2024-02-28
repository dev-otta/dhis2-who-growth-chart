import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import { ChartOptions } from 'chart.js';
import 'chart.js/auto';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';

export const GrowthChartBuilder = ({
    datasetValues,
    metadata,
    xAxisValues,
    yAxisValues,
    keysDataSet,
}: ChartDataTypes) => {
    const { minDataValue, maxDataValue } = yAxisValues;

    const data = {
        labels: xAxisValues,
        datasets: keysDataSet.map((key) => ({
            data: datasetValues.map((entry) => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
            label: key,
        })),
    };

    const options: ChartOptions<'line'> = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: i18n.t(metadata.timeUnit) } },
            y: {
                title: { display: true, text: metadata.measurementType },
                position: 'left',
                min: minDataValue,
                max: maxDataValue,
            },
            yRight: {
                position: 'right',
                min: minDataValue,
                max: maxDataValue,
                ticks: { padding: 18 },
            },
        },
        animation: { onProgress: (chartAnimation: any) => annotateLineEnd(chartAnimation) },
    };

    return <Line data={data} options={options} />;
};
