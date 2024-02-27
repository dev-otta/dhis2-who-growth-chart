import React, { useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { chartData } from '../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';
import { useRangeTimePeriode } from './useRangeTimePeriode';
import { ChartSelector } from '../GrowthChartSelector';
import { CategoryCodes } from '../../types/chartDataTypes';

export const GrowthChart = () => {
    const [category, setCategory] = useState<keyof typeof CategoryCodes>(
        Object.keys(chartData)[0] as keyof typeof CategoryCodes,
    );
    const [dataset, setDataset] = useState<keyof typeof chartData>(Object.keys(chartData[category].datasets)[0]);

    const categoryDataSets = chartData[category];
    const dataSetEntry = categoryDataSets.datasets[dataset];

    const dataSetValues = dataSetEntry.datasetValues;
    const dataSetMetadata = dataSetEntry.metadata;

    const xLabelValues = useRangeTimePeriode(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSetValues[0]);

    if (xLabelValues.length !== dataSetValues.length) {
        console.error('xLabelValues and dataSet should have the same length');
    }

    return (
        <div>
            <ChartSelector
                category={category}
                dataset={dataset}
                setCategory={setCategory}
                setDataset={setDataset}
            />

            <GrowthChartBuilder
                datasetValues={dataSetValues}
                metadata={dataSetMetadata}
                xLabelValues={xLabelValues}
                keysDataSet={keysDataSet}
            />
        </div>
    );
};
