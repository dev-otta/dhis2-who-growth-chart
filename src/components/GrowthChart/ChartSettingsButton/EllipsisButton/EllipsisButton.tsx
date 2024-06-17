// @flow
import * as React from 'react';
import { useRef, useState } from 'react';
import { Button, Layer, Popper, FlyoutMenu, IconMore16, MenuItem } from '@dhis2/ui';

type Props = {
    label?: string,
    primary?: boolean,
    secondary?: boolean,
    icon?: React.ReactElement,
    onClick?: () => void,
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
    icon,
    dataTest,
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
                            <MenuItem
                                label={label}
                                onClick={handleClick}
                                icon={icon}
                            />
                        </FlyoutMenu>
                    </Popper>
                </Layer>
            )}
        </>
    );
};
