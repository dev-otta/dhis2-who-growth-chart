import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';

export const GrowthChartBuilder = ({
    dataSetValues, dataSetMetadata, xLabelValues, keysDataSet,
}: ChartDataTypes) => {
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map((key) => ({
            data: dataSetValues.map((entry) => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
        })),
    };

    const options = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: i18n.t(`Age (${dataSetMetadata.timeUnit})`) } },
            y: { title: { display: true, text: dataSetMetadata.measurementType } },
        },
    };

    return <Line data={data} options={options} />;
};
