import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from '../../components/WidgetCollapsible';
import { Warning } from '../Icons';

interface GenericErrorProps {
    withWidgetCollapsible?: boolean;
    errorTextLine_1: string;
    errorTextLine_2?: string;
}

export const GenericError = ({
    withWidgetCollapsible = false,
    errorTextLine_1,
    errorTextLine_2,
}: GenericErrorProps) => {
    const [open, setOpen] = useState(true);
    return (
        withWidgetCollapsible ? (
            <div style={{
                width: '100vw',
                margin: 0,
                padding: 0,
            }}
            >
                <WidgetCollapsible
                    header={i18n.t('Growth Chart')}
                    borderless={false}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    <div className='flex justify-center'>
                        <Warning className='w-12 h-12' />
                        <p className='flex p-5 pt-2 items-center'>
                            {errorTextLine_1}
                            <br />
                            {errorTextLine_2}
                        </p>
                    </div>
                </WidgetCollapsible>
            </div>
        ) : (
            <div className='flex justify-center'>
                <Warning className='w-12 h-12' />
                <p className='flex p-5 pt-2 items-center'>
                    {errorTextLine_1}
                    <br />
                    {errorTextLine_2}
                </p>
            </div>
        )
    );
};
