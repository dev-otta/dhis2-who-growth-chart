import React from 'react';
import { CategoryCodes } from '../../types/chartDataTypes';
import { chartData } from '../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';

interface ChartSelectorProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof typeof chartData;
    setCategory: (category: keyof typeof CategoryCodes) => void;
    setDataset: (dataset: keyof typeof chartData) => void;
}

export const ChartSelector = ({
    category,
    dataset,
    setCategory,
    setDataset,
}: ChartSelectorProps) => {
    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newCategory = CategoryCodes[event.target.value as keyof typeof CategoryCodes];
        setCategory(newCategory);
        setDataset(Object.keys(chartData[newCategory].datasets)[0]);
    };

    const handleDatasetChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newDataset = event.target.value;
        setDataset(newDataset);
    };

    return (
        <div>
            <select value={CategoryCodes[category]} onChange={handleCategoryChange}>
                {Object.keys(CategoryCodes).map((key) => (
                    <option key={key} value={key}>
                        {CategoryCodes[key as keyof typeof CategoryCodes]}
                    </option>
                ))}
            </select>

            <select value={dataset} onChange={handleDatasetChange}>
                {Object.keys(chartData[category].datasets).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                ))}
            </select>
        </div>
    );
};
