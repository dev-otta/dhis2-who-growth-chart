import React, { ReactNode } from 'react';
import cx from 'classnames';

type Props = {
    children: ReactNode,
    className?: string,
    dataTest?: string,
    disabled?: boolean,
    onClick?: () => void,
};

export const IconButton = ({
    children, className, dataTest, onClick, disabled, ...passOnProps
}: Props) => (
    <button
        {...passOnProps}
        onClick={onClick}
        disabled={disabled}
        data-test={dataTest}
        className={cx(
            'cursor-pointer rounded-sm border-none bg-transparent flex items-center p-0.5 justify-center text-gray-700',
            'hover:bg-gray-200 hover:text-gray-800',
            'focus:outline-2 focus:bg-gray-200 focus:text-gray-800',
            { 'text-gray-500 cursor-not-allowed': disabled },
            className,
        )}
        type='button'
        tabIndex={0}
    >
        {children}
    </button>
);
