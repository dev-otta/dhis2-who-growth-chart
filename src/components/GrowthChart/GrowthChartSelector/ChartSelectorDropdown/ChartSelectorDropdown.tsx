import React from 'react';
import { Menu } from '@headlessui/react';
import { CategoryCodes, ChartData } from '../../../../types/chartDataTypes';
import { Chevron } from '../../../../UI/Icons';

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
        {isDisabled || items.length <= 1 ? (
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
