import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { ChartSelector } from './GrowthChartSelector';
import { ChartData, GenderCodes, MeasurementData } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/Hooks/Calculations';
import { ChartSettingsButton } from './ChartSettingsButton';
import { useChartDataForGender } from '../../utils/DataFetching/Sorting';
import { MappedEntityValues } from '../../utils/DataFetching/Sorting/useMappedTrackedEntity';
import { useAppropriateChartData } from '../../utils/Hooks/Calculations/useAppropriateChartData';

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
    const dateOfBirth = new Date(trackedEntity?.dateOfBirth);
    const [gender, setGender] = useState<string>(trackedEntityGender !== undefined ? trackedEntityGender : GenderCodes.CGC_Female);
    const { chartDataForGender } = useChartDataForGender({
        gender,
        chartData,
    });

    const {
        selectedCategory,
        selectedDataset,
        setSelectedCategory: setCategory,
        setSelectedDataset: setDataset,
    } = useAppropriateChartData(
        chartDataForGender,
        dateOfBirth,
        defaultIndicator,
        gender,
        setDefaultIndicatorError,
    );

    useEffect(() => {
        if (trackedEntity && Object.values(GenderCodes).includes(trackedEntity.gender)) {
            setGender(trackedEntity.gender);
        }
    }, [trackedEntity]);

    const dataSetEntry = chartDataForGender[selectedCategory]?.datasets[selectedDataset];

    const dataSetValues = isPercentiles ? dataSetEntry?.percentileDatasetValues : dataSetEntry?.zScoreDatasetValues;
    const dataSetMetadata = dataSetEntry?.metadata;
    const {
        min,
        max,
    } = useCalculateMinMaxValues(dataSetValues);

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
        <div>
            <div className='flex flex-wrap-reverse pl-14'>
                <div>
                    <ChartSelector
                        category={selectedCategory}
                        dataset={selectedDataset}
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
                        category={selectedCategory}
                        dataset={selectedDataset}
                        gender={gender}
                        trackedEntity={trackedEntity}
                    />
                </div>
            </div>
            <div className='px-2'>
                <div className='overflow-auto'>
                    <GrowthChartBuilder
                        measurementData={measurementData}
                        datasetValues={dataSetValues}
                        datasetMetadata={dataSetMetadata}
                        yAxisValues={yAxisValues}
                        keysDataSet={keysDataSet}
                        dateOfBirth={new Date(trackedEntity?.dateOfBirth)}
                        category={selectedCategory}
                        dataset={selectedDataset}
                        isPercentiles={isPercentiles}
                    />
                </div>
            </div>
        </div>
    );
};
