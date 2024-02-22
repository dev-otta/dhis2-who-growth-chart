import React, { useState } from 'react';
import './Plugin.module.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WidgetCollapsible } from './Components/WidgetCollapsible';
import { GrowthChart } from './Components/GrowthChart/GrowthChart';

const queryClient = new QueryClient();

const PluginInner = () => {
    const [open, setOpen] = useState(true);

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <div style={{
                backgroundColor: 'white',
                width: '100vw',
                display: 'flex',
                margin: 0,
                padding: 0,
            }}
            >
                <div
                    style={{ width: '100%' }}
                >
                    <WidgetCollapsible
                        header={'Growth Chart'}
                        borderless={false}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    >
                        <GrowthChart />
                    </WidgetCollapsible>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
