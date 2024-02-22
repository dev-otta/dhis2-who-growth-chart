import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';

export const GrowthChartBuilder = ({
    dataSetValues, dataSetMetadata, xLabelValues, keysDataSet,
}: ChartDataTypes) => {
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map((key) => ({
            data: dataSetValues.map((entry) => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
            label: key,
        })),
    };

    const options: any = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: i18n.t(`age (${dataSetMetadata.unit})`) } },
            y: { title: { display: true, text: dataSetMetadata.yaxis } },
        },
        layout: { padding: { right: 75 } },
        animation: { onProgress: annotateLineEnd },
    };

    return <Line data={data} options={options} />;
};
