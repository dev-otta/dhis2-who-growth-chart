import React, { useState, useRef, ReactNode } from 'react';
import { Button, Layer, Popper, FlyoutMenu, IconMore16 } from '@dhis2/ui';

type Props = {
    primary?: boolean;
    secondary?: boolean;
    dataTest?: string;
    small?: boolean;
    large?: boolean;
    children: ReactNode;
};

export const EllipsisButton = ({
    primary,
    secondary,
    small,
    large,
    dataTest,
    children,
}: Props) => {
    const anchorRef = useRef(null);
    const [actionsIsOpen, setActionsIsOpen] = useState(false);

    const toggle = () => {
        setActionsIsOpen((prev) => !prev);
    };

    return (
        <>
            <div ref={anchorRef}>
                <Button
                    primary={primary}
                    secondary={secondary}
                    dataTest={dataTest}
                    small={small}
                    large={large}
                    onClick={toggle}
                    icon={<IconMore16 />}
                />
            </div>
            {actionsIsOpen && (
                <Layer onBackdropClick={toggle}>
                    <Popper reference={anchorRef} placement='bottom-end'>
                        <FlyoutMenu dense>
                            {children}
                        </FlyoutMenu>
                    </Popper>
                </Layer>
            )}
        </>
    );
};
