// @flow
import * as React from 'react';
import { useRef, useState } from 'react';
import { Button, Layer, Popper, FlyoutMenu, IconMore16, MenuItem, ButtonProps } from '@dhis2/ui';

type Props = {
    label?: string,
    icon?: React.ReactElement,
    onClick?: () => void,
} & ButtonProps;

export const EllipsisButton = ({
    label,
    primary,
    secondary,
    small,
    large,
    onClick: handleClick,
    icon,
    dataTest,
    ...rest // spread remaining props
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
                    {...rest} // pass remaining props to Button
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
