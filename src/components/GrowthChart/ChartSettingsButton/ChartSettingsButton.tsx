import React, { useState, useRef, useEffect } from 'react';
import i18n from '@dhis2/d2-i18n';
import { usePopper } from 'react-popper';
import { EllipsisButton } from './EllipsisButton';
import { PopoverList, PopoverListItem, PopoverListDivider } from './PopoverList';
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
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom-end',
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 2] },
            },
        ],
    });

    const popoverRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target)) {
                setIsVisible(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handlePrintDocument = () => PrintDocument({
        category, dataset, gender, firstName: trackedEntity.firstName, lastName: trackedEntity.lastName,
    });

    return (
        <div ref={popoverRef}>
            <EllipsisButton
                onClick={() => setIsVisible((prevState) => !prevState)}
                isVisible={isVisible}
                setReferenceElement={setReferenceElement}
            />
            {isVisible && (
                <PopoverList
                    setPopperElement={setPopperElement}
                    style={styles.popper}
                    popoverAttributes={{ ...attributes.popper }}
                >
                    <PopoverListItem
                        label={i18n.t('Print')}
                        icon={<PrintIcon />}
                        onClick={handlePrintDocument}
                    />
                    <PopoverListDivider />
                </PopoverList>
            )}
        </div>
    );
};
