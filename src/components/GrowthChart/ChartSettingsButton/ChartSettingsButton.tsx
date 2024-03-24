import React, { useState } from 'react';
import { FlyoutMenu, IconMore16, MenuItem } from '@dhis2/ui';
import { EllipsisButton } from './EllipsisButton';
import { CategoryCodes, ChartData } from '../../../types/chartDataTypes';
import { PdfIcon } from '../../../UI/Icons/PdfIcon';
import { MappedEntityValues } from '../../../utils/DataFetching/Sorting/useMappedTrackedEntity';
import { PrintDocument } from '../../../utils/ChartOptions';

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

    const [actionsIsOpen, setActionsIsOpen] = useState(false);

    return (
        <div>
            <EllipsisButton
                open={actionsIsOpen}
                onClick={() => setActionsIsOpen((prev) => !prev)}
                icon={<IconMore16 />}
                small
                secondary
                dataTest='widget-profile-overflow-menu'
                component={(
                    <FlyoutMenu dense>
                        <MenuItem
                            label='Convert to PDF'
                            onClick={handlePrintDocument}
                            icon={<PdfIcon />}
                        />
                    </FlyoutMenu>
                )}
            />
        </div>
    );
};
