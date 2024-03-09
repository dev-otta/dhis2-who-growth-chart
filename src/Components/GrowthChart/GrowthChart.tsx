import React, { useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { chartData } from '../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';
import { useRangeTimePeriod } from './useRangeTimePeriod';
import { ChartSelector } from '../GrowthChartSelector';
import { CategoryCodes, ChartData } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/useCalculateMinMaxValues';
import { GrowthChartAnnotations } from './GrowthChartOptions';
import { ChartSettingsButton } from './ChartSettingsButton';

export const GrowthChart = () => {
    const [category, setCategory] = useState<keyof typeof CategoryCodes>(Object.keys(chartData)[0] as keyof typeof CategoryCodes);
    const [dataset, setDataset] = useState<keyof ChartData>(Object.keys(chartData[category].datasets)[0] as keyof ChartData);

    const categoryDataSets = chartData[category];
    const dataSetEntry = categoryDataSets.datasets[dataset];

    const dataSetValues = dataSetEntry.datasetValues;
    const dataSetMetadata = dataSetEntry.metadata;

    const xAxisValues = useRangeTimePeriod(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSetValues[0]);

    const { min, max } = useCalculateMinMaxValues(dataSetValues);
    const addRangePercentage = Math.floor((max - min) * 0.1);

    const [minDataValue, maxDataValue] = useMemo(() => {
        const minVal = Math.floor(min) - addRangePercentage;
        const maxVal = Math.ceil(max) + addRangePercentage;
        return [minVal, maxVal];
    }, [min, max, addRangePercentage]);

    const yAxisValues = { minDataValue, maxDataValue };

    const annotations = GrowthChartAnnotations(xAxisValues, dataSetMetadata.xAxisLabel);

    if (xAxisValues.length !== dataSetValues.length) {
        console.error('xAxisValues and dataSet should have the same length');
    }

    return (
        <div>
            <div className='flex flex-wrap-reverse pl-12'>
                <div>
                    <ChartSelector
                        category={category}
                        dataset={dataset}
                        setCategory={setCategory}
                        setDataset={setDataset}
                    />
                </div>
                <div className='grow relative min-w-[100px]'>
                    <ChartSettingsButton
                        category={category}
                        dataset={dataset}
                    />
                </div>
            </div>

            <GrowthChartBuilder
                datasetValues={dataSetValues}
                datasetMetadata={dataSetMetadata}
                xAxisValues={xAxisValues}
                yAxisValues={yAxisValues}
                keysDataSet={keysDataSet}
                annotations={annotations}
            />
        </div>
    );
};
