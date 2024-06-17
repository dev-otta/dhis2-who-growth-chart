import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { ChartSelector } from './GrowthChartSelector';
import { CategoryCodes, ChartData, GenderCodes, MeasurementData } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/Hooks/Calculations';
import { ChartSettingsButton } from './ChartSettingsButton';
import { useChartDataForGender } from '../../utils/DataFetching/Sorting';
import { MappedEntityValues } from '../../utils/DataFetching/Sorting/useMappedTrackedEntity';

interface GrowthChartProps {
    trackedEntity: MappedEntityValues;
    measurementData: MeasurementData[];
    isPercentiles: boolean;
    chartData: ChartData;
    defaultIndicator?: string;
    setDefaultIndicatorError: (error: boolean) => void;
}

export const GrowthChart = ({
    trackedEntity,
    measurementData,
    isPercentiles,
    chartData,
    defaultIndicator,
    setDefaultIndicatorError,
}: GrowthChartProps) => {
    const trackedEntityGender = trackedEntity?.gender;

    const [gender, setGender] = useState<string>(trackedEntityGender !== undefined ? trackedEntityGender : GenderCodes.CGC_Female);
    const { chartDataForGender } = useChartDataForGender({
        gender,
        chartData,
    });

    const [category, setCategory] = useState<keyof typeof CategoryCodes>();
    const [dataset, setDataset] = useState<string>();

    const isKeyOfCategoryCodes = (key: string): key is keyof typeof CategoryCodes => key in CategoryCodes;

    useEffect(() => {
        const key = `${defaultIndicator}_${gender.charAt(0).toLowerCase()}`;
        if (!isKeyOfCategoryCodes(key)) {
            setDefaultIndicatorError(true);
        }
        if (isKeyOfCategoryCodes(key) && chartDataForGender[key]) {
            const newCategory = CategoryCodes[key];
            setCategory(newCategory);
            const newDataset = Object.keys(chartDataForGender[newCategory].datasets)[0];
            setDataset(newDataset);
        }
    }, [chartDataForGender, defaultIndicator, gender, setDefaultIndicatorError]);

    useEffect(() => {
        if (trackedEntity && Object.values(GenderCodes).includes(trackedEntity.gender)) {
            setGender(trackedEntity.gender);
        }
    }, [trackedEntity]);

    const dataSetEntry = chartDataForGender[category]?.datasets[dataset];

    const dataSetValues = isPercentiles ? dataSetEntry?.percentileDatasetValues : dataSetEntry?.zScoreDatasetValues;
    const dataSetMetadata = dataSetEntry?.metadata;
    const { min, max } = useCalculateMinMaxValues(dataSetValues);

    const [minDataValue, maxDataValue] = useMemo(() => {
        const minVal = Math.max(0, Math.floor(min));
        const maxVal = Math.ceil(max);
        return [minVal, maxVal];
    }, [min, max]);

    if (!chartDataForGender || !dataSetValues) {
        return null;
    }

    const keysDataSet = Object.keys(dataSetValues[0]);
    const yAxisValues = {
        minDataValue,
        maxDataValue,
    };

    return (
        <>
            <div className='flex justify-between px-14'>
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
                <div className='relativ'>
                    <ChartSettingsButton
                        category={category}
                        dataset={dataset}
                        gender={gender}
                        trackedEntity={trackedEntity}
                    />
                </div>

            </div>
            <div className='overflow-auto px-2'>
                <GrowthChartBuilder
                    measurementData={measurementData}
                    datasetValues={dataSetValues}
                    datasetMetadata={dataSetMetadata}
                    yAxisValues={yAxisValues}
                    keysDataSet={keysDataSet}
                    dateOfBirth={new Date(trackedEntity?.dateOfBirth)}
                    category={category}
                    dataset={dataset}
                    isPercentiles={isPercentiles}
                />
            </div>
        </>
    );
};
