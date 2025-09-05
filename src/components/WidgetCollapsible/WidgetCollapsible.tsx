// @flow
import React, { useState, useEffect, useRef, ReactNode } from 'react';
import cx from 'classnames';
import { IconChevronUp24 } from '@dhis2/ui';
import { IconButton } from './IconButton';
import './WidgetCollapsible.css';

export const WidgetCollapsible = ({
    header,
    open,
    onOpen,
    onClose,
    borderless = false,
    children,
}: {
    header: ReactNode,
    open: boolean,
    onOpen: () => void,
    onClose: () => void,
    borderless?: boolean,
    children: ReactNode,
}) => {
    const [childrenVisible, setChildrenVisibility] = useState(open);
    const [animationsReady, setAnimationsReadyStatus] = useState(false);
    const [postEffectOpen, setPostEffectOpenStatus] = useState(open);
    const hideChildrenTimeoutRef = useRef(null);
    const initialRenderRef = useRef(true);

    useEffect(() => {
        if (initialRenderRef.current) {
            initialRenderRef.current = false;
            return;
        }

        if (!animationsReady) {
            setAnimationsReadyStatus(true);
        }

        setPostEffectOpenStatus(open);

        clearTimeout(hideChildrenTimeoutRef.current);
        if (open) {
            setChildrenVisibility(true);
        } else {
            hideChildrenTimeoutRef.current = setTimeout(() => {
                setChildrenVisibility(false);
            }, 200);
        }
    }, [open, animationsReady]);

    return (
        <div className='widget-container'>
            <div
                className={cx(
                    'widget-header',
                    {
                        'widget-header-open': childrenVisible,
                        'widget-header-borderless': borderless,
                    },
                )}
            >
                <div className='header-content'>
                    {header}
                    <IconButton
                        dataTest='widget-open-close-toggle-button'
                        className={cx(
                            'icon-button',
                            {
                                'icon-button-closed': !animationsReady && !postEffectOpen,
                                'icon-button-animate-open': animationsReady && postEffectOpen,
                                'icon-button-animate-close': animationsReady && !postEffectOpen,
                            },
                        )}
                        onClick={open ? onClose : onOpen}
                    >
                        <IconChevronUp24 />
                    </IconButton>
                </div>
            </div>
            {
                childrenVisible ? (
                    <div
                        data-test='widget-contents'
                        className={cx(
                            'widget-content',
                            {
                                'widget-content-animate-in': animationsReady && open,
                                'widget-content-animate-out': animationsReady && !open,
                                'widget-content-borderless': borderless,
                            },
                        )}
                    >
                        {children}
                    </div>
                ) : null
            }
        </div>
    );
};
