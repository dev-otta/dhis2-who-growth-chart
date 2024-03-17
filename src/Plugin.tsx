import React, { useState } from 'react';
import './Plugin.module.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WidgetCollapsible } from './Components/WidgetCollapsible';
import { GrowthChart } from './Components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useTeiById } from './utils/DataFetching/Hooks';
import { useChartConfig } from './utils/DataFetching/Hooks/useChartConfig';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { chartData } from './DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const { chartConfig, isLoading } = useChartConfig();
    const { customReferences, isLoading: isLoadingRef } = useCustomReferences();
    const { teiId } = propsFromParent;
    const { trackedEntity } = useTeiById({ teiId });

    const [open, setOpen] = useState(true);

    if (isLoading || isLoadingRef) {
        return <div>Loading...</div>;
    }

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
                        <GrowthChart
                            trackedEntity={trackedEntity}
                            chartConfig={chartConfig}
                            chartData={chartConfig.settings.customReferences ? customReferences : chartData}
                        />
                    </WidgetCollapsible>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
