import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';

export const GrowthChartBuilder = ({
    datasetValues, metadata, xLabelValues, keysDataSet,
}: ChartDataTypes) => {
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map((key) => ({
            data: datasetValues.map((entry) => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
            label: key,
        })),
    };

    const options = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: i18n.t(metadata.timeUnit) } },
            y: { title: { display: true, text: metadata.measurementType } },
        },
        layout: { padding: { right: 75 } },
        animation: { onProgress: (chartAnimation: any) => annotateLineEnd(chartAnimation) },
    };

    return <Line data={data} options={options} />;
};
