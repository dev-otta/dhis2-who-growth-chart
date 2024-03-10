import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { EllipsisButton } from './EllipsisButton';
import { PopoverList, PopoverListItem, PopoverListDivider } from './PopoverList';
import { usePrintDocument } from '../../../utils/usePrintDocument';
import { CategoryCodes, ChartData } from '../../../types/chartDataTypes';

interface ChartSettingsButtonProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
}

export const ChartSettingsButton = ({ category, dataset }: ChartSettingsButtonProps) => {
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

    const handlePrintDocument = () => usePrintDocument({ category, dataset });

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
                        label='Convert to PDF'
                        icon={(
                            <svg xmlns='http://www.w3.org/2000/svg' id='Layer_1' data-name='Layer 1' viewBox='0 0 24 24' width='20' height='20'>
                                <path
                                    d='M19.95,5.54l-3.49-3.49c-1.32-1.32-3.08-2.05-4.95-2.05H7C4.24,0,2,2.24,2,5v14c0,2.76,2.24,5,5,5h10c2.76,0,
                                    5-2.24,5-5V10.49c0-1.87-.73-3.63-2.05-4.95Zm-1.41,1.41c.32,.32,.59,.67,.81,1.05h-4.34c-.55,
                                    0-1-.45-1-1V2.66c.38,.22,.73,.49,1.05,.81l3.49,3.49Zm1.46,12.05c0,1.65-1.35,3-3,3H7c-1.65,
                                    0-3-1.35-3-3V5c0-1.65,1.35-3,3-3h4.51c.16,0,.33,0,.49,.02V7c0,1.65,1.35,3,3,3h4.98c.02,.16,.02
                                    ,.32,.02,.49v8.51ZM7.09,13h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.62,.62,.62s.62-.28,
                                    .62-.62v-1.22h.84c1.18,0,2.14-.95,2.14-2.11s-.96-2.11-2.14-2.11Zm0,2.97h-.83s0-1.72,0-1.72h.84c.48,
                                    0,.89,.39,.89,.86s-.41,.86-.89,.86Zm11.93-2.34c0,.35-.28,.62-.62,.62h-1.69v1.14h1.24c.35,0,
                                    .62,.28,.62,.62s-.28,.62-.62,.62h-1.24v1.8c0,.35-.28,.62-.62,.62s-.62-.28-.62-.62v-4.81c0-.35,
                                    .28-.62,.62-.62h2.31c.35,0,.62,.28,.62,.62Zm-6.93-.62h-1.09c-.55,0-1,.45-1,1v4.44c0,.35,.28,.56,
                                    .62,.56s1.46,0,1.46,0c1.18,0,2.14-.95,2.14-2.11v-1.78c0-1.16-.96-2.11-2.14-2.11Zm.89,3.89c0,
                                    .47-.41,.86-.89,.86h-.83s0-3.5,0-3.5h.84c.48,0,.89,.39,.89,.86v1.78Z'
                                />
                            </svg>
                        )}
                        onClick={handlePrintDocument}
                    />
                    <PopoverListDivider />
                </PopoverList>
            )}
        </div>
    );
};
