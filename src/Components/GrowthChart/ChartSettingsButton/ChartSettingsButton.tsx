import React, { useState } from 'react';
import { usePopper } from 'react-popper';

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
        <div className="relative">
            <button
                type="button"
                onClick={() => setIsVisible(!isVisible)}
                className="flex items-center justify-center w-7 h-7 rounded border text-gray-600 hover:bg-gray-300 hover:text-gray-700"
                ref={setReferenceElement}
                style={isVisible ? { border: '1px solid black' } : {}}
            >


                <svg height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 10a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4zm7 0a2 2 0 110 4 2 2 0 010-4z" fill="currentColor" fillRule="evenodd" />
                </svg>



            </button>
            {isVisible && (
                <div
                    ref={setPopperElement}
                    style={styles.popper}
                    {...attributes.popper}
                    className="bg-white border rounded border-gray-300 shadow-md z-10 absolute"
                >
                    {/* Example content inside the popper */}
                    <div className="p-2">
                        <p>This is some example content inside the popper.</p>
                        <p>You can add any HTML content here.</p>
                    </div>
                </div>
            )}
        </div>
    );
};
