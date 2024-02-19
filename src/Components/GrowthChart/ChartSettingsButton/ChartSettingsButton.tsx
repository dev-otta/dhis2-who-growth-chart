import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { EllipsisButton } from './EllipsisButton';
import { Popover } from '@material-ui/core';
import { PopoverList } from './PopoverList';


export const ChartSettingsButton = ({ onClick }: any) => {
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

    return (
        <div>
            <EllipsisButton onClick={() => setIsVisible(!isVisible)} isVisible={isVisible} setReferenceElement={setReferenceElement} />
            {isVisible && (
                <PopoverList
                    setPopperElement={setPopperElement}
                    style={styles.popper}
                    popoverAttributes={{ ...attributes.popper }}
                >
                    <p>This is some example content inside the popper.</p>
                    <p>You can add any HTML content here.</p>
                </PopoverList>
            )}
        </div>
    );
};
