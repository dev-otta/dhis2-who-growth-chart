import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { useRangeTimePeriode } from './useRangeTimePeriode';
import { ChartSelector } from '../GrowthChartSelector';
import { ChartData, GenderCodes, CategoryCodes } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/useCalculateMinMaxValues';
import { GrowthChartAnnotations } from './GrowthChartOptions';
import { useChartDataForGender } from '../../utils/DataFetching/Hooks/useChartDataForGender';

export const GrowthChart = () => {
    const [gender, setGender] = useState<keyof typeof GenderCodes>(GenderCodes.girls);
    const { chartDataForGender, categoryCodesForGender } = useChartDataForGender({ gender });

    const [category, setCategory] = useState<keyof typeof CategoryCodes>();
    const [dataset, setDataset] = useState<keyof ChartData>();

    useEffect(() => {
        if (Object.keys(chartDataForGender).length > 0 && categoryCodesForGender) {
            const newCategory = Object.keys(chartDataForGender)[0] as keyof typeof CategoryCodes;
            setCategory(newCategory);
            const newDataset = Object.keys(chartDataForGender[newCategory].datasets)[0] as keyof ChartData;
            setDataset(newDataset);
        }
    }, [chartDataForGender, categoryCodesForGender]);

    const dataSetEntry = chartDataForGender[category]?.datasets[dataset];

    const dataSetValues = dataSetEntry?.datasetValues;
    const dataSetMetadata = dataSetEntry?.metadata;

    const xAxisValues = useRangeTimePeriode(dataSetMetadata?.range.start, dataSetMetadata?.range.end);

    const { min, max } = useCalculateMinMaxValues(dataSetValues);
    const addRangePercentage = Math.floor((max - min) * 0.1);

    const [minDataValue, maxDataValue] = useMemo(() => {
        const minVal = Math.floor(min) - addRangePercentage;
        const maxVal = Math.ceil(max) + addRangePercentage;
        return [minVal, maxVal];
    }, [min, max, addRangePercentage]);

    const annotations = GrowthChartAnnotations(xAxisValues, dataSetMetadata?.timeUnit);

    if (!chartDataForGender || !categoryCodesForGender || !dataSetValues) {
        return null;
    }

    if (xAxisValues?.length !== dataSetValues?.length) {
        console.error('xAxisValues and dataSet should have the same length');
    }

    const keysDataSet = Object.keys(dataSetValues[0]);
    const yAxisValues = { minDataValue, maxDataValue };

    return (
        <div>
            <ChartSelector
                category={category}
                dataset={dataset}
                setCategory={setCategory}
                setDataset={setDataset}
                chartData={chartDataForGender}
                categoryCodes={categoryCodesForGender}
                gender={gender}
                setGender={setGender}
            />

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
