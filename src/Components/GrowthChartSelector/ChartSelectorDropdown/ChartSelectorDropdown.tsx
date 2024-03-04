import React from 'react';
import { Menu } from '@headlessui/react';
import { CategoryCodes, ChartData } from '../../../types/chartDataTypes';
import Chevron from '../../../UI/Icons/Chevron.svg';

interface ChartSelectorDropdownProps {
    title: keyof typeof CategoryCodes | keyof ChartData;
    items: string[];
    handleItemChange: (key: string) => void;
}

export const ChartSelectorDropdown = ({
    title,
    items,
    handleItemChange,
}: ChartSelectorDropdownProps) => (
    <div className='flex flex-col'>
        <Menu>
            {({ open }) => (
                <>
                    <Menu.Button
                        className={'flex flex-row rounded border border-gray-300 py-1 gap-2 pl-4 pr-2 items-center whitespace-nowrap'}
                    >
                        {title}
                        <Chevron className={`w-3 h-3 ${open ? 'rotate-180' : ''}`} />
                    </Menu.Button>
                    <Menu.Items className='flex flex-col bg-white rounded shadow-lg z-10 absolute mt-8'>
                        {items.map((key) => (
                            key !== title && (
                                <Menu.Item key={key}>
                                    {({ active }) => (
                                        <button
                                            className={`${active && 'bg-gray-200'} py-1 px-4 whitespace-nowrap`}
                                            onClick={() => handleItemChange(key)}
                                        >
                                            {key}
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
);
