import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { useRangeTimePeriod } from '../../utils/useRangeTimePeriod';
import { ChartSelector } from '../GrowthChartSelector';
import { ChartData, GenderCodes, CategoryCodes } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/useCalculateMinMaxValues';
import { GrowthChartAnnotations } from './GrowthChartOptions';
import { ChartSettingsButton } from './ChartSettingsButton';
import { useChartDataForGender } from '../../utils/DataFetching/Sorting/useChartDataForGender';
import { useTeiById } from '../../utils/DataFetching/Hooks';

interface GrowthChartProps {
    teiId: string;
}

export const GrowthChart = ({ teiId }: GrowthChartProps) => {
    const { trackedEntity } = useTeiById({ teiId });
    const trackedEntityGender = GenderCodes[trackedEntity?.attributes.find(
        (attribute: any) => attribute.displayName === 'Gender',
    ).value?.toLowerCase() as 'male' | 'female'];

    const [gender, setGender] = useState<keyof typeof GenderCodes>(trackedEntityGender || GenderCodes.male);
    const { chartDataForGender } = useChartDataForGender({ gender });

    const [category, setCategory] = useState<keyof typeof CategoryCodes>();
    const [dataset, setDataset] = useState<keyof ChartData>();

    useEffect(() => {
        if (Object.keys(chartDataForGender).length > 0) {
            const newCategory = Object.keys(chartDataForGender)[0] as keyof typeof CategoryCodes;
            setCategory(newCategory);
            const newDataset = Object.keys(chartDataForGender[newCategory].datasets)[0] as keyof ChartData;
            setDataset(newDataset);
        }
    }, [chartDataForGender]);

    useEffect(() => {
        trackedEntityGender && setGender(trackedEntityGender);
    }, [trackedEntityGender]);

    const dataSetEntry = chartDataForGender[category]?.datasets[dataset];

    const dataSetValues = dataSetEntry?.datasetValues;
    const dataSetMetadata = dataSetEntry?.metadata;

    const xAxisValues = useRangeTimePeriod(dataSetMetadata?.range.start, dataSetMetadata?.range.end);

    const { min, max } = useCalculateMinMaxValues(dataSetValues);

    const [minDataValue, maxDataValue] = useMemo(() => {
        const minVal = Math.max(0, Math.floor(min));
        const maxVal = Math.ceil(max);
        return [minVal, maxVal];
    }, [min, max]);

    const annotations = GrowthChartAnnotations(xAxisValues, dataSetMetadata?.xAxisLabel);

    if (!chartDataForGender || !dataSetValues) {
        return null;
    }

    if (xAxisValues.length !== dataSetValues.length) {
        console.error('xAxisValues and dataSet should have the same length');
    }

    const keysDataSet = Object.keys(dataSetValues[0]);
    const yAxisValues = { minDataValue, maxDataValue };

    return (
        <div>
            <div className='flex flex-wrap-reverse pl-12'>
                <div>
                    <ChartSelector
                        category={category}
                        dataset={dataset}
                        setCategory={setCategory}
                        setDataset={setDataset}
                        chartData={chartDataForGender}
                        isDisabled={trackedEntityGender !== undefined}
                        gender={gender}
                        setGender={setGender}
                    />
                </div>
                <div className='grow relative min-w-[100px] text-sm'>
                    <ChartSettingsButton
                        category={category}
                        dataset={dataset}
                        gender={gender}
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
