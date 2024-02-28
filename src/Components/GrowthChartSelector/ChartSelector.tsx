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
        <div className='w-full flex'>
            <div className='flex gap-2 text-sm pl-12'>
                <div className='flex flex-col relative min-w-fit'>
                    <Menu>
                        {({ open }) => (
                            <>
                                <Menu.Button
                                    className={'flex flex-row rounded w-full border border-gray-300 py-1 gap-2 px-4'}
                                >
                                    {category}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='currentColor'
                                        id='Outline'
                                        viewBox='0 0 24 24'
                                        className={`w-5 h-5 ${open ? 'rotate-180' : ''}`}
                                    >
                                        <path
                                            transform='rotate(90 12 12)'
                                            d={`M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,
                                            1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z`}
                                        />
                                    </svg>
                                </Menu.Button>
                                <Menu.Items className='flex flex-col w-full bg-white rounded shadow-lg border absolute border-gray-300 mt-7'>
                                    {Object.keys(CategoryCodes).map((key) => (
                                        CategoryCodes[key as keyof typeof CategoryCodes] !== category && (
                                            <Menu.Item key={key}>
                                                {({ active }) => (
                                                    <button
                                                        className={`${active && 'bg-gray-200'} py-1`}
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
                                    className='flex flex-row rounded w-full border border-gray-300 py-1 justify-center gap-2 px-4'
                                >
                                    {dataset}
                                    <svg
                                        xmlns='http://www.w3.org/2000/svg'
                                        fill='currentColor'
                                        id='Outline'
                                        viewBox='0 0 24 24'
                                        className={`w-5 h-5 transform ${open ? 'rotate-180' : ''}`}
                                    >
                                        <path
                                            transform='rotate(90 12 12)'
                                            d={`M15.4,9.88,10.81,5.29a1,1,0,0,0-1.41,0,1,1,0,0,0,0,1.42L14,11.29a1,
                                            1,0,0,1,0,1.42L9.4,17.29a1,1,0,0,0,1.41,1.42l4.59-4.59A3,3,0,0,0,15.4,9.88Z`}
                                        />
                                    </svg>
                                </Menu.Button>
                                <Menu.Items className='flex flex-col w-full bg-white rounded absolute shadow-lg border border-gray-300 mt-7'>
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
        </div>
    );
};
