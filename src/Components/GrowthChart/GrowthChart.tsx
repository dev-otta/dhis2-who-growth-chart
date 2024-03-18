import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { useRangeTimePeriod } from '../../utils/useRangeTimePeriod';
import { ChartSelector } from '../GrowthChartSelector';
import { ChartData, GenderCodes, CategoryCodes, MeasurementData } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/useCalculateMinMaxValues';
import { GrowthChartAnnotations } from './GrowthChartOptions';
import { ChartSettingsButton } from './ChartSettingsButton';
import { useChartDataForGender } from '../../utils/DataFetching/Sorting/useChartDataForGender';
import { ChartConfig } from '../../utils/DataFetching/Hooks/useChartConfig';

interface GrowthChartProps {
    trackedEntity: ChartConfig['metadata']['attributes'];
    measurementData: MeasurementData[];
}

export const GrowthChart = ({
    trackedEntity,
    measurementData,
}: GrowthChartProps) => {
    const trackedEntityGender = GenderCodes[trackedEntity?.gender?.toLowerCase() as 'male' | 'female'];
    const [gender, setGender] = useState<keyof typeof GenderCodes>(trackedEntityGender !== undefined ? trackedEntityGender : GenderCodes.female);
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
        trackedEntity?.gender !== undefined && setGender(GenderCodes[trackedEntity?.gender?.toLowerCase() as 'male' | 'female']);
    }, [trackedEntity]);

    const dataSetEntry = chartDataForGender[category]?.datasets[dataset];

    const dataSetValues = dataSetEntry?.datasetValues;
    const dataSetMetadata = dataSetEntry?.metadata;

    //remove
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
                measurementData={measurementData}
                datasetValues={dataSetValues}
                datasetMetadata={dataSetMetadata}
                yAxisValues={yAxisValues}
                keysDataSet={keysDataSet}
                annotations={annotations}
                dateOfBirth={new Date(trackedEntity?.dateOfBirth)}
                category={category}
                dataset={dataset}
            />
        </div>
    );
};
