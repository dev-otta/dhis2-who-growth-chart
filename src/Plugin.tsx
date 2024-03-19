import React, { useState } from 'react';
import './Plugin.module.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from './Components/WidgetCollapsible';
import { GrowthChart } from './Components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useTeiById } from './utils/DataFetching/Hooks';
import { useChartConfig } from './utils/DataFetching/Hooks/useChartConfig';
import { useMappedGrowthVariables } from './utils/DataFetching/Sorting/useMappedGrowthVariables';
import { useEventsByProgramStage } from './utils/DataFetching/Hooks/useEvents';
import { useMappedTrackedEntityVariables } from './utils/DataFetching/Sorting/useMappedTrackedEntity';
import { ChartConfigError } from './UI/GenericError/ChartConfigError';
import { GenericLoading } from './UI/GenericLoading';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { chartData } from './DataSets/WhoStandardDataSets/ChartDataZscores';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const { chartConfig, isLoading, isError } = useChartConfig();
    const { customReferences, isLoading: isLoadingRef } = useCustomReferences();
    const { teiId, programId, orgUnitId } = propsFromParent;
    const { trackedEntity } = useTeiById({ teiId });
    const { events } = useEventsByProgramStage({
        orgUnitId,
        programStageId: chartConfig?.metadata.program.programStageId,
        programId,
        teiId,
    });

    const mappedTrackedEntity = useMappedTrackedEntityVariables({
        variableMappings: chartConfig?.metadata.attributes, trackedEntity, trackedEntityAttributes: trackedEntity?.attributes,
    });

    const mappedGrowthVariables = useMappedGrowthVariables({
        growthVariables: chartConfig?.metadata.dataElements,
        events,
        isWeightInGrams: chartConfig?.settings.weightInGrams || false,
    });

    const [open, setOpen] = useState(true);

    if (isLoading || isLoadingRef) {
        return <GenericLoading />;
    }

    if (isError) {
        return <ChartConfigError />;
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
                        header={i18n.t('Growth Chart')}
                        borderless={false}
                        open={open}
                        onOpen={() => setOpen(true)}
                        onClose={() => setOpen(false)}
                    >
                        <GrowthChart
                            trackedEntity={mappedTrackedEntity}
                            measurementData={mappedGrowthVariables}
                            chartData={chartConfig.settings.customReferences ? customReferences : chartData}
                        />
                    </WidgetCollapsible>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
