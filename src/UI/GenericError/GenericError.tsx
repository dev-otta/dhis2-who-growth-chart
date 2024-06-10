import React, { useState } from 'react';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from '../../components/WidgetCollapsible';
import { Warning } from '../Icons';

interface GenericErrorProps {
    errorMessage: string;
}

export const GenericError = ({ errorMessage }: GenericErrorProps) => {
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
                    <p className={'flex items-center'}>
                        <Warning className='w-12 h-12' />
                    </p>
                    <p className='flex p-5 items-center w-1/2 max-w-[500px]'>
                        {errorMessage}
                    </p>
                </div>
            </WidgetCollapsible>
        </div>
    );
};
