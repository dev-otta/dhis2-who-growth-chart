import React, { useEffect, useMemo, useState } from 'react';
import { GrowthChartBuilder } from './GrowthChartBuilder';
import { ChartSelector } from './GrowthChartSelector';
import { GenderCodes, CategoryCodes, MeasurementData, ChartData } from '../../types/chartDataTypes';
import { useCalculateMinMaxValues } from '../../utils/Hooks/Calculations/useCalculateMinMaxValues';
import { ChartSettingsButton } from './ChartSettingsButton';
import { useChartDataForGender } from '../../utils/DataFetching/Sorting/useChartDataForGender';
import { MappedEntityValues } from '../../utils/DataFetching/Sorting/useMappedTrackedEntity';

interface GrowthChartProps {
    trackedEntity: MappedEntityValues;
    measurementData: MeasurementData[];
    isPercentiles: boolean;
    chartData: ChartData;
}

export const GrowthChart = ({
    trackedEntity,
    measurementData,
    isPercentiles,
    chartData,
}: GrowthChartProps) => {
    const trackedEntityGender = trackedEntity.gender;

    const [gender, setGender] = useState<string>(trackedEntityGender !== undefined ? trackedEntityGender : GenderCodes.CGC_Female);
    const { chartDataForGender } = useChartDataForGender({ gender, chartData });

    const [category, setCategory] = useState<keyof typeof CategoryCodes>();
    const [dataset, setDataset] = useState<string>();

    useEffect(() => {
        if (Object.keys(chartDataForGender).length > 0) {
            const newCategory = Object.keys(chartDataForGender)[0] as keyof typeof CategoryCodes;
            setCategory(newCategory);
            const newDataset = Object.keys(chartDataForGender[newCategory].datasets)[0];
            setDataset(newDataset);
        }
    }, [chartDataForGender]);

    useEffect(() => {
        Object.values(GenderCodes).includes(trackedEntity.gender) && setGender(trackedEntity?.gender);
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
                        trackedEntity={trackedEntity}
                    />
                </div>
            </div>

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
    );
};
