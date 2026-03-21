import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from '../../components/WidgetCollapsible';
import { Warning } from '../Icons';

export interface GenericErrorProps {
    errorMessage: string;
    /** When true, only the message body is rendered (for use inside Plugin's WidgetCollapsible). */
    embedded?: boolean;
}

export const GenericError = ({ errorMessage, embedded = false }: GenericErrorProps) => {
    const [open, setOpen] = useState(true);

    const body = (
        <div className='flex w-full box-border items-start gap-4 p-5'>
            <p className='flex shrink-0 items-center'>
                <Warning className='w-12 h-12' />
            </p>
            <p className='flex min-w-0 flex-1 items-center'>
                {errorMessage}
            </p>
        </div>
    );

    if (embedded) {
        return body;
    }

    return (
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
                {body}
            </WidgetCollapsible>
        </div>
    );
};
