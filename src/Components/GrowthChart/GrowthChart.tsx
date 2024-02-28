import React, { useMemo } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { chartData } from '../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';
import { useRangeTimePeriode } from './useRangeTimePeriode';
import { ChartCodes, CategoryCodes } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/useCalculateMinMaxValues';
import { GrowthChartAnnotations } from './GrowthChartOptions';

export const GrowthChart = () => {
    const categoryDataSets = chartData[CategoryCodes.lhfa_b];
    const dataSetEntry = categoryDataSets.datasets[ChartCodes.lhfa_b_2_5_y_z];

    const dataSetValues = dataSetEntry.datasetValues;
    const dataSetMetadata = dataSetEntry.metadata;

    const xAxisValues = useRangeTimePeriode(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSetValues[0]);

    const { min, max } = useCalculateMinMaxValues(dataSetValues);
    const addRangePercentage = Math.floor((max - min) * 0.1);

    const [minDataValue, maxDataValue] = useMemo(() => {
        const minVal = Math.floor(min) - addRangePercentage;
        const maxVal = Math.ceil(max) + addRangePercentage;
        return [minVal, maxVal];
    }, [min, max, addRangePercentage]);

    const yAxisValues = { minDataValue, maxDataValue };

    const annotations = { annotations: GrowthChartAnnotations(xAxisValues, dataSetMetadata.timeUnit) };
    if (xAxisValues.length !== dataSetValues.length) {
        console.error('xAxisValues and dataSet should have the same length');
    }

    return (
        <GrowthChartBuilder
            dataSetValues={dataSetValues}
            dataSetMetadata={dataSetMetadata}
            xAxisValues={xAxisValues}
            yAxisValues={yAxisValues}
            keysDataSet={keysDataSet}
            annotations={annotations}
        />
    );
};
