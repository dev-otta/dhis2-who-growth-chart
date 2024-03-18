import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from '../../Components/WidgetCollapsible';
import { Warning } from '../Icons';

export const ChartConfigError = () => {
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
                <div className='flex justify-center'>
                    <Warning className='w-12 h-12' />
                    <p className='flex p-5 pt-2'>
                        {i18n.t('There was an error fetching the config for the growth chart.')}
                        <br />
                        {i18n.t('Please check the configuration in Datastore Management and try again.')}
                    </p>
                </div>
            </WidgetCollapsible>
        </div>
    );
};
