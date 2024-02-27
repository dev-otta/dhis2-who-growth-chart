import React from 'react';
import { Menu } from '@headlessui/react';
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
    const handleCategoryChange = (key: string) => {
        const newCategory = CategoryCodes[key as keyof typeof CategoryCodes];
        setCategory(newCategory);
        setDataset(Object.keys(chartData[newCategory].datasets)[0]);
    };

    const handleDatasetChange = (key: string) => {
        const newDataset = key as keyof typeof chartData;
        setDataset(newDataset);
    };

    return (
        <div className='w-full flex justify-center items-center'>
            <div className='flex w-1/2 gap-2 py-2 font-medium'>
                <div className='flex w-1/2 relative'>
                    <Menu>
                        <Menu.Button
                            className='py-3 bg-gray-200 rounded w-full h-full'
                        >
                            {category}
                        </Menu.Button>
                        <Menu.Items className='flex flex-col w-full bg-white rounded shadow-lg absolute'>
                            {Object.keys(CategoryCodes).map((key) => (
                                <Menu.Item key={key}>
                                    {({ active }) => (
                                        <button
                                            className={
                                                `
                                                ${active && 'bg-gray-300'} 
                                                ${CategoryCodes[key as keyof typeof CategoryCodes] === category
                                                && 'bg-gray-200'} 
                                                py-3`
                                            }
                                            onClick={() => handleCategoryChange(key)}
                                        >
                                            {CategoryCodes[key as keyof typeof CategoryCodes]}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>
                </div>
                <div className='flex w-1/2 relative'>
                    <Menu>
                        <Menu.Button
                            className='py-3 bg-gray-200 rounded w-full h-full'
                        >
                            {dataset}
                        </Menu.Button>
                        <Menu.Items className='flex flex-col w-full bg-white rounded shadow-lg absolute'>
                            {Object.keys(chartData[category].datasets).map((key) => (
                                <Menu.Item key={key}>
                                    {({ active }) => (
                                        <button
                                            className={
                                                `${active && 'bg-gray-300'} ${key === dataset && 'bg-gray-200'} py-3`
                                            }
                                            onClick={() => handleDatasetChange(key)}
                                        >
                                            {key}
                                        </button>
                                    )}
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Menu>
                </div>
            </div>
        </div>
    );
};
