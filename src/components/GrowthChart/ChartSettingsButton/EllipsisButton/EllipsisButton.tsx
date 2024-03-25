// @flow
import * as React from 'react';
import { useRef, useState } from 'react';
import { Button, Layer, Popper } from '@dhis2/ui';

type Props = {
    label?: string,
    primary?: boolean,
    secondary?: boolean,
    icon?: React.ReactElement,
    onClick?: () => void,
    open?: boolean,
    component: React.ReactNode,
    dataTest?: string,
    small?: boolean,
    large?: boolean,
};

export const EllipsisButton = ({
    label,
    primary,
    secondary,
    small,
    large,
    onClick: handleClick,
    open: propsOpen,
    icon,
    dataTest,
    component,
}: Props) => {
    const [isOpen, setIsOpen] = useState(false);
    const anchorRef = useRef(null);
    const open = propsOpen !== undefined ? propsOpen : isOpen;

    const toggle = () => {
        if (propsOpen === undefined) {
            setIsOpen((prev) => !prev);
        }
        handleClick && handleClick();
    };

    return (
        <div className='flex items-center absolute right-[55px] justify-center w-7 h-7 rounded border
        text-gray-600 hover:bg-gray-300 hover:text-gray-700'
        >
            <div ref={anchorRef}>
                {/* @ts-ignore */}
                <Button
                    primary={primary}
                    secondary={secondary}
                    dataTest={dataTest}
                    small={small}
                    large={large}
                    onClick={toggle}
                    icon={icon}
                >
                    {label}
                </Button>

                {open && (
                    <Layer onBackdropClick={toggle}>
                        <Popper reference={anchorRef} placement='bottom-end'>
                            {component}
                        </Popper>
                    </Layer>
                )}
            </div>
        </div>
    );
};
