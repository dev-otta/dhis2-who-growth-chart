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
        setDataset(key as keyof typeof chartData);
    };

    return (
        <div className='flex flex-wrap w-full gap-2 text-sm pl-12'>
            <div className='flex flex-col relative min-w-fit'>
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button
                                className={'flex flex-row rounded min-w-fit border border-gray-300 py-1 gap-2 pl-4 pr-2 justify-center items-center'}
                            >
                                {category}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 12 12'
                                    className={`w-3 h-3 ${open ? 'rotate-180' : ''}`}
                                >
                                    <path
                                        d={`m5.29289 8.7071c.39053.3905 1.02369.3905 1.41422 0l2.99999-2.99999c.3905-.39053.3905-1.02369 
                                    0-1.41422-.3905-.39052-1.0237-.39052-1.4142 0l-2.2929 2.2929-2.29289-2.2929c-.39053-.39052-1.02369-.39052-1.41422 
                                    0-.39052.39053-.39052 1.02369 0 1.41422z`}
                                    />
                                </svg>
                            </Menu.Button>
                            <Menu.Items className='flex flex-col bg-white rounded shadow-lg border absolute border-gray-300 mt-7 z-10'>
                                {Object.keys(CategoryCodes).map((key) => (
                                    CategoryCodes[key as keyof typeof CategoryCodes] !== category && (
                                        <Menu.Item key={key}>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-gray-200'} py-1 px-4 whitespace-nowrap`}
                                                    onClick={() => handleCategoryChange(key)}
                                                >
                                                    {CategoryCodes[key as keyof typeof CategoryCodes]}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    )
                                ))}
                            </Menu.Items>
                        </>
                    )}
                </Menu>
            </div>
            <div className='flex flex-col relative min-w-fit items-center'>
                <Menu>
                    {({ open }) => (
                        <>
                            <Menu.Button
                                className='flex flex-row rounded w-full border border-gray-300 py-1 justify-center gap-2 pl-4 pr-2 items-center'
                            >
                                {dataset}
                                <svg
                                    xmlns='http://www.w3.org/2000/svg'
                                    viewBox='0 0 12 12'
                                    className={`w-3 h-3 ${open ? 'rotate-180' : ''}`}
                                >
                                    <path
                                        d={`m5.29289 8.7071c.39053.3905 1.02369.3905 1.41422 0l2.99999-2.99999c.3905-.39053.3905-1.02369 
                                    0-1.41422-.3905-.39052-1.0237-.39052-1.4142 0l-2.2929 2.2929-2.29289-2.2929c-.39053-.39052-1.02369-.39052-1.41422 
                                    0-.39052.39053-.39052 1.02369 0 1.41422z`}
                                    />
                                </svg>
                            </Menu.Button>
                            <Menu.Items className='flex flex-col w-full bg-white rounded absolute shadow-lg border border-gray-300 mt-7 z-10'>
                                {Object.keys(chartData[category].datasets).map((key) => (
                                    key !== dataset && (
                                        <Menu.Item key={key}>
                                            {({ active }) => (
                                                <button
                                                    className={`${active && 'bg-gray-200'} py-1`}
                                                    onClick={() => handleDatasetChange(key)}
                                                >
                                                    {key}
                                                </button>
                                            )}
                                        </Menu.Item>
                                    )))}
                            </Menu.Items>
                        </>
                    )}
                </Menu>
            </div>
        </div>
    );
};
