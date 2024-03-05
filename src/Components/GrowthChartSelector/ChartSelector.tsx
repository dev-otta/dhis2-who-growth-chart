import React from 'react';
import { ChartData, CategoryCodes, GenderCodes } from '../../types/chartDataTypes';
import { ChartSelectorDropdown } from './ChartSelectorDropdown/ChartSelectorDropdown';

interface ChartSelectorProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
    setCategory: (category: keyof typeof CategoryCodes) => void;
    setDataset: (dataset: keyof ChartData) => void;
    chartData: ChartData;
    categoryCodes: Record<string, string>;
    gender: string;
    setGender: (gender: keyof typeof GenderCodes) => void;
}

export const ChartSelector = ({
    category,
    dataset,
    setCategory,
    setDataset,
    chartData,
    categoryCodes,
    gender,
    setGender,
}: ChartSelectorProps) => {
    const handleCategoryChange = (value: string) => {
        const newCategory = value as keyof typeof CategoryCodes;
        setCategory(newCategory);
        setDataset(Object.keys(chartData[newCategory].datasets)[0] as keyof ChartData);
    };

    const handleDatasetChange = (value: string) => {
        setDataset(value as keyof ChartData);
    };

    return (
        <div className='flex flex-wrap w-full gap-2 text-sm pl-12'>
            <ChartSelectorDropdown
                title={gender}
                items={Object.values(GenderCodes)}
                handleItemChange={setGender}
            />
            <ChartSelectorDropdown
                title={category}
                items={Object.keys(categoryCodes)}
                handleItemChange={handleCategoryChange}
            />
            <ChartSelectorDropdown
                title={dataset}
                items={Object.keys(chartData[category].datasets)}
                handleItemChange={handleDatasetChange}
            />
        </div>
    );
};
