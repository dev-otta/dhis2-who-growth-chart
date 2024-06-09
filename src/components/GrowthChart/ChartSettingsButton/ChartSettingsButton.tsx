import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { EllipsisButton } from './EllipsisButton';
import { CategoryCodes, ChartData } from '../../../types/chartDataTypes';
import { MappedEntityValues } from '../../../utils/DataFetching/Sorting/useMappedTrackedEntity';
import { PrintDocument } from '../../../utils/ChartOptions';
import { PrintIcon } from '../../../UI/Icons/PrintIcon';

interface ChartSettingsButtonProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
    gender: string;
    trackedEntity: MappedEntityValues;
}

export const ChartSettingsButton = ({
    category,
    dataset,
    gender,
    trackedEntity,
}: ChartSettingsButtonProps) => {
    const handlePrintDocument = () => {
        PrintDocument({
            category,
            dataset,
            gender,
            firstName: trackedEntity.firstName,
            lastName: trackedEntity.lastName,
        });
    };

    return (
        <EllipsisButton
            dataTest='widget-profile-overflow-menu'
            icon={<PrintIcon />}
            label={i18n.t('Print')}
            onClick={handlePrintDocument}
            secondary
            small
        />
    );
};
