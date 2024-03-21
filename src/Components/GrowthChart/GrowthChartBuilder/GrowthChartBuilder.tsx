import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import Chart, { ChartOptions } from 'chart.js/auto';
import annotationPlugin from 'chartjs-plugin-annotation';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartDataTypes, CategoryToLabel, MeasurementTypeCodes } from '../../../types/chartDataTypes';
import { annotateLineEnd } from '../../../utils/annotateLineEnd';
import { useMeasurementPlotting, useZscoreLines } from '../../../utils';
import { tooltipConfig } from './tooltipConfig';
import { useGrowthChartAnnotations } from '../../../utils/GrowthChartOptions';

interface GrowthChartBuilderProps extends ChartDataTypes {
    category: keyof typeof CategoryToLabel;
    dataset: string | number;
    dateOfBirth: Date;
}

export const GrowthChartBuilder = ({
    datasetValues,
    datasetMetadata,
    yAxisValues,
    keysDataSet,
    measurementData,
    category,
    dataset,
    dateOfBirth,
}: GrowthChartBuilderProps) => {
    Chart.register(annotationPlugin);

    const { minDataValue, maxDataValue } = yAxisValues;

    const MeasurementCode = MeasurementTypeCodes[category];

    const ZscoreLinesData = useZscoreLines(datasetValues, keysDataSet, datasetMetadata, category, dataset);
    const MeasurementData = useMeasurementPlotting(measurementData, MeasurementCode, category, dataset, dateOfBirth);
    const data: any = { datasets: [...ZscoreLinesData, ...MeasurementData] };
    const annotations = useGrowthChartAnnotations(ZscoreLinesData, datasetMetadata);

    const options: ChartOptions<'line'> = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: {
            annotation: { annotations },
            legend: { display: false },
            tooltip: {
                ...tooltipConfig(category, datasetMetadata.xAxisLabel, datasetMetadata.yAxisLabel),
                animation: false,
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
