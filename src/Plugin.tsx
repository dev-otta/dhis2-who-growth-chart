import React, { useState } from 'react';
import './Plugin.module.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from './components/WidgetCollapsible';
import { GrowthChart } from './components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useChartConfig, useEvents, useTeiById } from './utils/DataFetching/Hooks';
import { useMappedGrowthVariables } from './utils/DataFetching/Sorting/useMappedGrowthVariables';
import { useMappedTrackedEntityVariables } from './utils/DataFetching/Sorting/useMappedTrackedEntity';
import { GenericLoading } from './UI/GenericLoading';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { chartData } from './DataSets/WhoStandardDataSets/ChartData';
import { ConfigError, CustomReferenceError, DefaultIndicatorError } from './UI/FeedbackComponents';
import { TrackedEntityError } from './UI/FeedbackComponents/TrackedEntityError';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const [defaultIndicatorError, setDefaultIndicatorError] = useState<boolean>(false);

    const {
        chartConfig,
        isLoading,
        isError,
    } = useChartConfig();

    const {
        customReferences,
        isLoading: isLoadingRef,
        isError: isErrorRef,
    } = useCustomReferences();

    const {
        teiId,
        programId,
        orgUnitId,
    } = propsFromParent;

    const {
        trackedEntity,
        isLoading: isLoadingTei,
        isError: isErrorTei,
    } = useTeiById({ teiId });

    const { events } = useEvents({
        orgUnitId,
        programStageId: chartConfig?.metadata.program.programStageId,
        programId,
        teiId,
    });

    const mappedTrackedEntity = useMappedTrackedEntityVariables({
        variableMappings: chartConfig?.metadata.attributes,
        trackedEntity,
        trackedEntityAttributes: trackedEntity?.attributes,
    });

    const mappedGrowthVariables = useMappedGrowthVariables({
        growthVariables: chartConfig?.metadata.dataElements,
        events,
        isWeightInGrams: chartConfig?.settings.weightInGrams || false,
    });

    const isPercentiles = chartConfig?.settings.usePercentiles || false;

    const defaultIndicator = chartConfig?.settings.defaultIndicator || 'wfa';

    const [open, setOpen] = useState(true);

    if (isLoading || isLoadingRef || isLoadingTei) {
        return <GenericLoading />;
    }

    if (isError) {
        return (
            <ConfigError />
        );
    }

    if (chartConfig?.settings.customReferences && isErrorRef) {
        return (
            <CustomReferenceError />
        );
    }

    if (defaultIndicatorError) {
        return (
            <DefaultIndicatorError defaultIndicator={defaultIndicator} />
        );
    }

    if (isErrorTei) {
        return (
            <TrackedEntityError />
        );
    }

    return (
        <QueryClientProvider
            client={queryClient}
        >
            <div
                style={{
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
                            defaultIndicator={defaultIndicator}
                            isPercentiles={isPercentiles}
                            setDefaultIndicatorError={setDefaultIndicatorError}
                        />
                    </WidgetCollapsible>
                </div>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
