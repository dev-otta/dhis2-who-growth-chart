import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from '../../components/WidgetCollapsible';

export const GenericLoading = (): JSX.Element => {
    const [open, setOpen] = useState(true);
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
                <div className='flex p-5'>
                    <div className='w-full h-20 animate-pulse bg-gray-300' />
                </div>
            </WidgetCollapsible>
        </div>
    );
};
