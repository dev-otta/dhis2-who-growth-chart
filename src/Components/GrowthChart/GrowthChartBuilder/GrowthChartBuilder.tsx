import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartDataTypes, CategoryToLabel, CategoryLabels } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';
import { useMeasurementDataChart } from '../../../utils/useMeasurementDataChart';

interface GrowthChartBuilderProps extends ChartDataTypes {
    category: keyof typeof CategoryToLabel;
    dataset: string | number;
    dateOfBirth: Date;
    usePercent: boolean;
}

export const GrowthChartBuilder = ({
    datasetValues,
    datasetMetadata,
    yAxisValues,
    keysDataSet,
    annotations,
    measurementData,
    category,
    dataset,
    dateOfBirth,
    usePercent,
}: GrowthChartBuilderProps) => {
    Chart.register(annotationPlugin);

    const { minDataValue, maxDataValue } = yAxisValues;

    const adjustIndex = (dataset === '2 to 5 years') ? 24 : 0;

    const ZscoreLines = keysDataSet.map((key) => ({
        data: datasetValues.map((entry, index) => ({
            x: (category !== 'wflh_b' && category !== 'wflh_g') ? adjustIndex + index : datasetMetadata.range.start + index,
            y: entry[key],
        })),
        borderWidth: 0.9,
        borderColor: chartLineColorPicker(key, usePercent),
        label: key,
    }));

    const categoryLabel = CategoryToLabel[category];
    const datasetMappings: { [key: string]: string } = {
        [CategoryLabels.hcfa]: 'headCircumference',
        [CategoryLabels.lhfa]: 'height',
        [CategoryLabels.wfa]: 'weight',
        [CategoryLabels.wflh]: 'weight',
    };

    const fieldName = datasetMappings[categoryLabel];
    const formattedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
    const MeasurementData = useMeasurementDataChart(measurementData, fieldName, category, dataset, dateOfBirth);

    const data: any = { datasets: [...ZscoreLines, ...MeasurementData] };

    const options: ChartOptions<'line'> = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: {
            annotation: { annotations },
            legend: { display: false },
            tooltip: {
                enabled: true,
                intersect: false,
                position: 'nearest',
                backgroundColor: 'white',
                bodyFont: { size: 12 },
                bodyColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
                padding: 12,
                caretPadding: 4,
                boxPadding: 4,
                usePointStyle: true,
                filter: (tooltipItem: any) => tooltipItem.dataset.id === 'measurementData',
                callbacks: {
                    title: () => '',
                    beforeLabel: (tooltipItem: any) => {
                        const date = new Date(tooltipItem.raw.eventDate).toLocaleDateString();
                        return `${i18n.t('Date')}: ${date}`;
                    },
                    label: (tooltipItem: any) => {
                        if (category === 'wflh_b' || category === 'wflh_g') {
                            return `${i18n.t('Height')}: ${tooltipItem.label} | ${i18n.t('Weight')}: ${tooltipItem.formattedValue}`;
                        }
                        const value = tooltipItem.formattedValue;
                        return `${formattedFieldName}: ${value}`;
                    },
                },
            },
        },
        scales: {
            x: {
                type: 'linear',
                title: {
                    display: true,
                    text: i18n.t(datasetMetadata.xAxisLabel),
                    font: { size: 13 },
                },
                min: datasetMetadata.range.start,
                max: datasetMetadata.range.end,
                ticks: { stepSize: 1 },
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
                ticks: { padding: usePercent ? 36 : 18 },
            },
        },
        animation: {
            onComplete: (chartAnimation: any) => annotateLineEnd(chartAnimation, usePercent, keysDataSet),
            onProgress: (chartAnimation: any) => annotateLineEnd(chartAnimation, usePercent, keysDataSet),
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
