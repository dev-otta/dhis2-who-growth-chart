import { useEffect, useRef, useState } from 'react';
import { differenceInMonths, differenceInWeeks } from 'date-fns';
import { CategoryCodes, ChartData, MeasurementTypeCodesLabel, TimeUnitCodes } from '../../../types/chartDataTypes';

export const useAppropriateChartData = (
    chartDataForGender: ChartData,
    dateOfBirth: Date,
) => {
    const [selectedCategory, setSelectedCategory] = useState<keyof typeof CategoryCodes>();
    const [selectedDataset, setSelectedDataset] = useState<string>();

    const selectDatasetForCategoryRef = useRef<(category: keyof typeof CategoryCodes) => void>();
    selectDatasetForCategoryRef.current = (category: keyof typeof CategoryCodes) => {
        const { datasets } = chartDataForGender[category];
        const childAgeInWeeks = differenceInWeeks(new Date(), dateOfBirth);
        const childAgeInMonths = differenceInMonths(new Date(), dateOfBirth);
        Object.entries(datasets)
            .some(([key, value]) => {
                const { range } = value.metadata;
                const xAxis = value.metadata.xAxisLabel;

                if (Object.values(MeasurementTypeCodesLabel)
                    .includes(xAxis)) {
                    setSelectedDataset((prevDataset) => (prevDataset !== key ? key : prevDataset));
                    return true;
                }

                if (xAxis === TimeUnitCodes.weeks && childAgeInWeeks <= 13) {
                    setSelectedDataset((prevDataset) => (prevDataset !== key ? key : prevDataset));
                    return true;
                }

                const isChildAgeInRange = xAxis === TimeUnitCodes.months && childAgeInMonths >= range.start && childAgeInMonths <= range.end;

                if (isChildAgeInRange) {
                    setSelectedDataset((prevDataset) => (prevDataset !== key ? key : prevDataset));
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
        if (Object.keys(chartDataForGender).length > 0) {
            const firstKey = Object.keys(chartDataForGender)[0];
            if (firstKey) {
                chartDataForGender[firstKey] && setSelectedCategory(firstKey);
            }
        }
    }, [chartDataForGender]);

    return {
        selectedCategory,
        selectedDataset,
        setSelectedCategory,
        setSelectedDataset,
    };
};
