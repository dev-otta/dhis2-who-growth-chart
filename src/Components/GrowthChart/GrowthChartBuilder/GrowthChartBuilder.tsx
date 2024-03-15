import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2'; // Endret importen her
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartDataTypes, CategoryToLabel, CategoryLabels } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';
import { useMeasurementDataForcategory } from '../../../utils/useMeasurementDataForCategory';

interface GrowthChartBuilderProps extends ChartDataTypes {
    category: keyof typeof CategoryToLabel;
}

export const GrowthChartBuilder = ({
    datasetValues,
    datasetMetadata,
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
    const datasetMappings: { [key: string]: string } = {
        [CategoryLabels.hcfa]: 'headCircumference',
        [CategoryLabels.lhfa]: 'height',
        [CategoryLabels.wfa]: 'weight',
        [CategoryLabels.wflh]: 'weight',
    };

    const fieldName = datasetMappings[categoryLabel];
    const formattedFieldName = fieldName.charAt(0).toUpperCase() + fieldName.substring(1);
    const MeasurementData = useMeasurementDataForcategory(measurementData, fieldName, category);

    console.log('MeasurementData', MeasurementData);
    console.log('ZscoreLines', ZscoreLines);

    const data = {
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
                        if (category === 'wflh_b' || category === 'wflh_g') {
                            const date = new Date(tooltipItem.raw.eventDate).toLocaleDateString();
                            return `${i18n.t('Date')}: ${date}`;
                        }
                        const date = new Date(tooltipItem.label).toLocaleDateString();
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
                type: category === 'wflh_b' || category === 'wflh_g' ? 'linear' : 'category',
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
