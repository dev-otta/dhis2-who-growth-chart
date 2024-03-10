import React from 'react';
import { Menu } from '@headlessui/react';
import { CategoryCodes, ChartData } from '../../../types/chartDataTypes';

interface ChartSelectorDropdownProps {
    title: keyof typeof CategoryCodes | keyof ChartData;
    items: string[];
    handleItemChange: (key: string) => void;
    isDisabled?: boolean;
    dataTest?: string;
}

export const ChartSelectorDropdown = ({
    title,
    items,
    handleItemChange,
    isDisabled,
    dataTest,
}: ChartSelectorDropdownProps) => (
    <div className='flex flex-col'>
        {isDisabled ? (
            <button
                className='flex flex-row rounded border border-gray-300 py-1 gap-2 h-7 px-4 items-center whitespace-nowrap'
                disabled
                data-test={`${dataTest}-disabled-button`}
            >
                {title}
            </button>
        ) : (
            <Menu>
                {({ open }) => (
                    <>
                        <Menu.Button
                            className='flex flex-row rounded border border-gray-300 py-1 gap-2 h-7 pl-4 pr-2 items-center whitespace-nowrap'
                            data-test={`${dataTest}-button`}
                        >
                            {title}
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
                        <Menu.Items className='flex flex-col bg-white rounded shadow-lg z-10 absolute mt-8'>
                            {items.map((key) => (
                                key !== title && (
                                    <Menu.Item key={key}>
                                        {({ active }) => (
                                            <button
                                                className={`${active && 'bg-gray-200'} py-1 px-4 whitespace-nowrap`}
                                                onClick={() => handleItemChange(key)}
                                                data-test={`${dataTest}-item`}
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
        )}
    </div>
);
