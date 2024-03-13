import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartDataTypes, CategoryToLabel } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';
import { useMeasurementDataForcategory } from '../../../utils/useMeasurementDataForCategory';

interface GrowthChartBuilderProps extends ChartDataTypes {
    category: keyof typeof CategoryToLabel;
}

export const GrowthChartBuilder = ({
    datasetValues,
    datasetMetadata,
    xAxisValues,
    yAxisValues,
    keysDataSet,
    annotations,
    measurementData,
    category,
}: GrowthChartBuilderProps) => {
    Chart.register(annotationPlugin);

    const { minDataValue, maxDataValue } = yAxisValues;

    const ZscoreLines = keysDataSet.map((key) => ({
        data: datasetValues.map((entry) => entry[key]),
        borderWidth: 0.9,
        borderColor: chartLineColorPicker(key),
        label: key,
    }));

    const categoryLabel = CategoryToLabel[category];
    const MeasurementData = useMeasurementDataForcategory(measurementData, categoryLabel);

    const data = {
        labels: xAxisValues,
        datasets: [
            ...ZscoreLines,
            ...MeasurementData,
        ],
    };

    const options: ChartOptions<'line'> = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: {
            annotation: { annotations },
            legend: { display: false },
            tooltip: {
                intersect: false,
                filter: (tooltipItem: any) => tooltipItem.datasetIndex === 7,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: i18n.t(datasetMetadata.xAxisLabel),
                    font: { size: 13 },
                },
            },
            y: {
                title: {
                    display: true,
                    text: i18n.t(datasetMetadata.yAxisLabel),
                    font: { size: 13 },
                },
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
        animation: {
            onComplete: (chartAnimation: any) => annotateLineEnd(chartAnimation),
            onProgress: (chartAnimation: any) => annotateLineEnd(chartAnimation),
        },
    };

    return (
        <div className='aspect-video min-h-[400px]' id='divToPrint'>
            <AutoSizer>
                {/* eslint-disable-next-line react/no-unused-prop-types */}
                {({ height, width }: { height: number, width: number }) => (
                    <div style={{ height, width }}>
                        <Line data={data} options={options} />
                    </div>
                )}
            </AutoSizer>
        </div>
    );
};
