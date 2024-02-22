import React, { useState, useRef, useEffect } from 'react';
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
        <div className='absolute top-2 right-2' ref={popoverRef}>
            <EllipsisButton onClick={() => setIsVisible(prevState => !prevState)} isVisible={isVisible} setReferenceElement={setReferenceElement} />  
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
