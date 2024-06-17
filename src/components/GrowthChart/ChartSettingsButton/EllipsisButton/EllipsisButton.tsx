import React, { useState, useRef } from 'react';
import { Button, Layer, Popper, FlyoutMenu, IconMore16, MenuItem, ButtonProps } from '@dhis2/ui';

interface Props extends ButtonProps {
    label?: string;
    icon?: React.ReactElement;
    onClick: () => void;
}

export const EllipsisButton = ({
    label,
    icon,
    onClick,
    ...buttonProps
}: Props) => {
    const anchorRef = useRef<HTMLDivElement>(null);
    const [actionsIsOpen, setActionsIsOpen] = useState(false);

    const toggle = () => {
        setActionsIsOpen((prev) => !prev);
    };

    return (
        <>
            <div ref={anchorRef}>
                <Button
                    onClick={toggle}
                    icon={icon ?? <IconMore16 />}
                    {...buttonProps}
                />
            </div>
            {actionsIsOpen && (
                <Layer onBackdropClick={toggle}>
                    <Popper reference={anchorRef} placement='bottom-end'>
                        <FlyoutMenu dense>
                            <MenuItem
                                label={label}
                                onClick={onClick}
                                icon={icon}
                            />
                        </FlyoutMenu>
                    </Popper>
                </Layer>
            )}
        </>
    );
};
