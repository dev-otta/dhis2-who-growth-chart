import React, { useState, useRef, useEffect } from 'react';
import { usePopper } from 'react-popper';
import { EllipsisButton } from './EllipsisButton';
import { PopoverList, PopoverListItem, PopoverListDivider } from './PopoverList';

export const ChartSettingsButton = () => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [isVisible, setIsVisible] = useState(false);

    const { styles, attributes } = usePopper(referenceElement, popperElement, {
        placement: 'bottom',
        modifiers: [
            {
                name: 'offset',
                options: { offset: [0, 5] },
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
                        label='Coming soon'
                        icon={'🔧'}
                        onClick={() => { }}
                    />
                    <PopoverListDivider />
                    <PopoverListItem
                        label='Coming soon'
                        icon={<span>🔧</span>}
                        onClick={() => { }}
                    />
                    {/* rm listitem */}
                </PopoverList>
            )}
        </div>
    );
};
