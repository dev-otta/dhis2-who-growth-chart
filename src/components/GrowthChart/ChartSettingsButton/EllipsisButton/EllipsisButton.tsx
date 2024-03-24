// @flow
import * as React from 'react';
import { useRef, useState } from 'react';
import { Button, Layer, Popper } from '@dhis2/ui';

type Props = {
    label?: string,
    primary?: boolean,
    secondary?: boolean,
    icon?: React.Node,
    onClick?: () => void,
    open?: boolean,
    component: React.Node,
    dataTest?: string,
    small?: boolean,
    large?: boolean,
    className: string,
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
    className,
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
        <div className="ellipses-button-container" style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
                    className='' //legges til høyre
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
