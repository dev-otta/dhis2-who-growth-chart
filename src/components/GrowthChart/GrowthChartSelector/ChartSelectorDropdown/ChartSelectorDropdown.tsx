import React from 'react';
import { DropdownButton, FlyoutMenu, MenuItem, Button } from '@dhis2/ui';
import { CategoryCodes, ChartData } from '../../../../types/chartDataTypes';

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
            // @ts-ignore
            <Button
                className='pointer-events-none'
                dataTest={`${dataTest}-disabled-button`}
            >
                {title}
            </Button>
        ) : (
            <DropdownButton
                component={(
                    <FlyoutMenu>
                        {items.map((key) => (
                            key !== title && (
                                <MenuItem
                                    key={key}
                                    label={key}
                                    onClick={() => handleItemChange(key)}
                                    dataTest={`${dataTest}-item`}
                                />
                            )
                        ))}
                    </FlyoutMenu>
                )}
                name={`${dataTest}-button`}
            >
                {title}
            </DropdownButton>
        )}
    </div>
);
