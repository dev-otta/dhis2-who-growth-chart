import React from 'react';
import { CategoryCodes, ChartData } from '../../types/chartDataTypes';
import { chartData } from '../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';
import { ChartSelectorDropdown } from './ChartSelectorDropdown/ChartSelectorDropdown';

interface ChartSelectorProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof typeof chartData;
    setCategory: (category: keyof typeof CategoryCodes) => void;
    setDataset: (dataset: keyof ChartData) => void;
}

export const ChartSelector = ({
    category,
    dataset,
    setCategory,
    setDataset,
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
        <div className='flex flex-wrap w-full gap-2 text-sm'>
            <ChartSelectorDropdown
                title={category}
                items={Object.values(CategoryCodes)}
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
