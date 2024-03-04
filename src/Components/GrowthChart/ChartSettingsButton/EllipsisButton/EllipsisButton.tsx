import React from 'react';
import { Ellipsis } from '../../../../UI/Icons/Ellipsis.svg';

type EllipsisButtonProps = {
    onClick: () => void;
    isVisible: boolean;
    setReferenceElement: (element: HTMLButtonElement | null) => void;
};

export const EllipsisButton = ({ onClick, isVisible, setReferenceElement }: EllipsisButtonProps): JSX.Element => (
    <button
        type='button'
        aria-label='Chart settings'
        onClick={onClick}
        ref={setReferenceElement}
        className='flex items-center justify-center w-7 h-7 rounded border
        text-gray-600 hover:bg-gray-300 hover:text-gray-700'
        style={isVisible ? { border: '1px solid black' } : {}}
    >
        <Ellipsis />
    </button>
);
