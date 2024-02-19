import React, { useState } from 'react';
import { usePopper } from 'react-popper';
import { EllipsisButton } from './EllipsisButton';
import { PopoverList, PopoverListItem } from './PopoverList';

type ChartSettingsButtonProps = {
    setShowAnnotation: React.Dispatch<React.SetStateAction<boolean>>;
};

export const ChartSettingsButton = ({ setShowAnnotation }: ChartSettingsButtonProps) => {
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
        <div className='absolute top-2 right-2'>
            <EllipsisButton onClick={() => setIsVisible(!isVisible)} isVisible={isVisible} setReferenceElement={setReferenceElement} />
            {isVisible && (
                <PopoverList
                    setPopperElement={setPopperElement}
                    style={styles.popper}
                    popoverAttributes={{ ...attributes.popper }}
                >
                    <PopoverListItem label="Settings" icon={<span>🔧</span>} onClick={() => console.log('Not Implemented')} />
                    <PopoverListItem label="Annotations" icon={<span>📥</span>} onClick={() => setShowAnnotation(prevState => !prevState)} />                    
                    <PopoverListItem label="Export" icon={<span>📤</span>} onClick={() => console.log('Not Implemented')} />
                    <PopoverListItem label="Print" icon={<span>🖨️</span>} onClick={() => console.log('Not Implemented')} />
                    <PopoverListItem label="Help" icon={<span>❓</span>} onClick={() => console.log('Not Implemented')} />
                </PopoverList>
            )}
        </div>
    );
};
