import React, { useState } from 'react';
import './Plugin.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from './components/WidgetCollapsible';
import { GrowthChart } from './components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useChartConfig, useTeiById } from './utils/DataFetching/Hooks';
import { useEvents } from './utils/DataFetching/Hooks/useEvents';
import { useConfigValidation } from './utils/DataFetching/Hooks/useConfigValidation';
import { useRuntimeValidation } from './utils/DataFetching/Hooks/useRuntimeValidation';
import { useMappedGrowthVariables } from './utils/DataFetching/Sorting/useMappedGrowthVariables';
import { useMappedTrackedEntityVariables } from './utils/DataFetching/Sorting/useMappedTrackedEntity';
import { GenericLoading } from './UI/GenericLoading';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { chartData as chartDataWHO } from './DataSets/WhoStandardDataSets/ChartData';
import { useFilterByMissingData } from './utils/DataFetching/Sorting';
import { MissingGrowthVariablesError } from './UI/GenericError/MissingGrowthVariablesError';
import { ConfigError, CustomReferenceError, DefaultIndicatorError } from './UI/FeedbackComponents';
import { TrackedEntityError } from './UI/FeedbackComponents/TrackedEntityError';
import { GenericError } from './UI/GenericError';
import { ConfigValidationError } from './UI/ConfigValidationError';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const [defaultIndicatorError, setDefaultIndicatorError] = useState<boolean>(false);
    const [open, setOpen] = useState(true);

    const {
        teiId,
        orgUnitId,
    } = propsFromParent;

    const {
        chartConfig,
        isLoading,
        isError,
    } = useChartConfig();

    const {
        customReferences,
        isLoading: isLoadingRef,
        isError: isErrorRef,
    } = useCustomReferences(chartConfig?.settings?.customReferences || false);

    const configValidation = useConfigValidation(chartConfig, isLoading, isError);
    const runtimeValidation = useRuntimeValidation(teiId, orgUnitId);

    const {
        trackedEntity,
        isLoading: isLoadingTei,
        isError: isErrorTei,
    } = useTeiById({ teiId });

    const {
        events,
        isLoading: isLoadingEvents,
        isError: isErrorEvents,
    } = useEvents({
        programStages: chartConfig?.metadata?.programStages || [],
        orgUnitId,
        teiId,
    });

    const mappedTrackedEntity = useMappedTrackedEntityVariables({
        variableMappings: chartConfig?.metadata?.attributes,
        trackedEntity,
        trackedEntityAttributes: trackedEntity?.attributes,
    });
    
    const mappedGrowthVariables = useMappedGrowthVariables({
        growthVariables: chartConfig?.metadata?.dataElements ? {
            headCircumference: chartConfig.metadata.dataElements.headCircumference,
            height: chartConfig.metadata.dataElements.height,
            weight: chartConfig.metadata.dataElements.weight,
        } : undefined,
        events,
        isWeightInGrams: chartConfig?.settings?.weightInGrams || false,
    });

    const { chartData, measurementDataExist } = useFilterByMissingData(
        mappedGrowthVariables,
        chartConfig && customReferences && chartConfig?.settings?.customReferences ? customReferences : chartDataWHO,
    );

    const isPercentiles = chartConfig?.settings?.usePercentiles || false;
    const defaultIndicator = chartConfig?.settings?.defaultIndicator || 'wfa';

    if (isLoading || isLoadingRef || isLoadingTei || isLoadingEvents) {
        return <GenericLoading />;
    }

    if (!configValidation.isValid || !runtimeValidation.isValid) {
        return (
            <ConfigValidationError 
                errors={[...configValidation.errors, ...runtimeValidation.errors]}
                warnings={configValidation.warnings}
            />
        );
    }

    if (isError) {
        return (
            <ConfigError />
        );
    }

    if (isErrorEvents) {
        return (
            <GenericError
                errorMessage={i18n.t('Unable to load growth data. Please check that the configured programs and stages exist and are accessible.')}
            />
        );
    }

    if (chartConfig?.settings?.customReferences && isErrorRef) {
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

    if (measurementDataExist.headCircumference === false && measurementDataExist.height === false && measurementDataExist.weight === false) {
        return <MissingGrowthVariablesError />;
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className='bg-white w-screen flex m-0 p-0'>
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
                        chartData={chartData}
                        defaultIndicator={defaultIndicator}
                        isPercentiles={isPercentiles}
                        setDefaultIndicatorError={setDefaultIndicatorError}
                    />
                </WidgetCollapsible>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
