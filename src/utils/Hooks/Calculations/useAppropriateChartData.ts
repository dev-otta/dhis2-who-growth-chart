import { useEffect, useRef, useState } from 'react';
import {
    CategoryCodes,
    ChartData,
    isDefaultIndicatorPrefix,
    MeasurementTypeCodesLabel,
    TimeUnitCodes,
} from '../../../types/chartDataTypes';

const firstChartKeyWithData = (
    keys: string[],
    byGender: ChartData,
): keyof typeof CategoryCodes | undefined =>
    keys.find((k): k is keyof typeof CategoryCodes => k in CategoryCodes && Boolean(byGender[k]));

export const useAppropriateChartData = (
    chartDataForGender: ChartData,
    defaultIndicator: string,
    gender: string,
    childAgeInWeeks: number,
    childAgeInMonths: number,
) => {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CategoryCodes>();
    const [selectedDataset, setSelectedDataset] = useState<string>();

    const selectDatasetForCategoryRef = useRef<(category: keyof typeof CategoryCodes) => void>();
    selectDatasetForCategoryRef.current = (category: keyof typeof CategoryCodes) => {
        const { datasets } = chartDataForGender[category];

        const isMeasurementType = (xAxis: string) =>
            Object.values(MeasurementTypeCodesLabel)
                .includes(xAxis);

        const isWeeksInRange = (xAxis: string) =>
            xAxis === TimeUnitCodes.weeks && childAgeInWeeks < 13;

        const isMonthsInRange = (xAxis: string, range: { start: number, end: number }) =>
            xAxis === TimeUnitCodes.months && childAgeInMonths >= range.start && childAgeInMonths < range.end;

        const getMaxRangeDataset = (datasets: ChartData[0]['datasets']) =>
            Object.entries(datasets)
                .reduce((max, [key, value]) =>
                    ((!max || value.metadata.range.end > max[1].metadata.range.end) ? [key, value] : max));

        const isAboveRange = (xAxis: string, range: { start: number, end: number }) =>
            xAxis === TimeUnitCodes.months && childAgeInMonths >= range.end;
        Object.entries(datasets)
            .some(([key, value]) => {
                const { range } = value.metadata;
                const xAxis = value.metadata.xAxisLabel;

                if (isMeasurementType(xAxis) || isWeeksInRange(xAxis) || isMonthsInRange(xAxis, range)) {
                    setSelectedDataset((prevDataset) => (prevDataset !== key ? key : prevDataset));
                    return true;
                }

                if (isAboveRange(xAxis, range)) {
                    const [newDatasetKey] = getMaxRangeDataset(datasets);
                    setSelectedDataset(newDatasetKey);
                    return true;
                }
                return false;
            });
    };

    useEffect(() => {
        if (selectedCategory && chartDataForGender[selectedCategory]) {
            selectDatasetForCategoryRef.current?.(selectedCategory);
        }
    }, [selectedCategory, chartDataForGender]);

    useEffect(() => {
        const suffix = gender.charAt(0).toLowerCase();
        const prefix = isDefaultIndicatorPrefix(defaultIndicator) ? defaultIndicator : 'wfa';
        const preferredKeys =
            prefix === 'wfa'
                ? [`wfa_${suffix}`]
                : [`${prefix}_${suffix}`, `wfa_${suffix}`];

        const chartKey = firstChartKeyWithData(preferredKeys, chartDataForGender);

        if (!chartKey) {
            return;
        }

        const category = CategoryCodes[chartKey];
        setSelectedCategory(category);
        setSelectedDataset(Object.keys(chartDataForGender[category].datasets)[0]);
    }, [chartDataForGender, defaultIndicator, gender]);

    return {
        selectedCategory,
        selectedDataset,
        setSelectedCategory,
        setSelectedDataset,
    };
};
