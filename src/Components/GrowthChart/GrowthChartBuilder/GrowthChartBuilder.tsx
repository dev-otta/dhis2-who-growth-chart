import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';

export const GrowthChartBuilder = ({
    datasetValues,
    datasetMetadata,
    xAxisValues,
    yAxisValues,
    keysDataSet,
    annotations,
}: ChartDataTypes) => {
    Chart.register(annotationPlugin);

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
        plugins: {
            annotation: { annotations },
            legend: { display: false },
        },
        scales: {
            x: { title: { display: true, text: i18n.t(datasetMetadata.timeUnit) } },
            y: {
                title: { display: true, text: datasetMetadata.measurementType },
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

    return (
        <div className='aspect-video min-h-[400px]'>
            <AutoSizer>
                {/* eslint-disable-next-line react/no-unused-prop-types */}
                {({ height, width }: { height: number, width: number}) => (
                    <div style={{ height, width }}>
                        <Line data={data} options={options} />
                    </div>
                )}
            </AutoSizer>
        </div>
    );
};
