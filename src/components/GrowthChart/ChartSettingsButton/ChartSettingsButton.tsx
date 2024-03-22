import React, { useState, useRef, useEffect } from 'react';
import { Popover, Menu, MenuItem } from '@dhis2/ui';
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
    const [isVisible, setIsVisible] = useState(false);
    const referenceElementRef = useRef(null);

    const handlePrintDocument = () => {
        PrintDocument({
            category,
            dataset,
            gender,
            firstName: trackedEntity.firstName,
            lastName: trackedEntity.lastName,
        });
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (referenceElementRef.current && !referenceElementRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={referenceElementRef}>
            <EllipsisButton
                onClick={() => setIsVisible((prevState) => !prevState)}
                isVisible={isVisible}
                setReferenceElement={(element) => {
                    referenceElementRef.current = element;
                }}
            />
            {isVisible && (
                <Popover
                    reference={referenceElementRef.current}
                    onClickOutside={() => setIsVisible(false)}
                    arrow={false}
                    placement='bottom-end'
                >
                    <Menu>
                        <MenuItem
                            label='Convert to PDF'
                            onClick={handlePrintDocument}
                            icon={<PdfIcon />}
                        />
                    </Menu>
                </Popover>
            )}
        </div>
    );
};
