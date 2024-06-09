import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { SingleSelectField, SingleSelectOption, Tooltip, InputField } from '@dhis2/ui';
import { CategoryCodes, ChartData } from '../../../../types/chartDataTypes';

interface ChartSelectorDropdownProps {
    title: keyof typeof CategoryCodes | keyof ChartData;
    items: string[];
    handleItemChange: (key: string) => void;
    isDisabled?: boolean;
    dataTest?: string;
    inputWidth?: string;
}

export const ChartSelectorDropdown = ({
    title,
    items,
    handleItemChange,
    isDisabled,
    dataTest,
    inputWidth,
}: ChartSelectorDropdownProps) => {
    const tooltipContent = i18n.t('Gender is pre-selected based on the profile');
    return (
        isDisabled ? (
            <Tooltip openDelay={500} closeDelay={50} content={tooltipContent}>
                <InputField
                    value={title.toString()}
                    disabled
                    inputWidth='50px'
                    dense
                />
            </Tooltip>
        ) : (
            <SingleSelectField
                className='cursor-pointer'
                onChange={({ selected }) => handleItemChange(selected)}
                selected={title.toString()}
                inputWidth={inputWidth}
                dense
                data-test={`${dataTest}-button`}
            >
                {items.map((item) => (
                    <SingleSelectOption
                        key={item}
                        label={item}
                        value={item}
                        data-test={`${dataTest}-item`}
                    />
                ))}
            </SingleSelectField>
        )
    );
};
