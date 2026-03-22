import React, { useMemo, useState } from 'react';
import './Plugin.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from './components/WidgetCollapsible';
import { GrowthChart } from './components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useChartConfig, usePluginErrorHandling, useProgramTrackedEntityAttributes } from './utils/DataFetching/Hooks';
import { useEvents } from './utils/DataFetching/Hooks/useEvents';
import { useProgramStageDataElements } from './utils/DataFetching/Hooks/useProgramStageDataElements';
import { useGenderAttributeOptionCodes } from './utils/DataFetching/Hooks/useGenderAttributeOptionCodes';
import { useProgramStageMappingValidation } from './utils/DataFetching/Hooks/useProgramStageMappingValidation';
import { useConfigValidation } from './utils/DataFetching/Hooks/useConfigValidation';
import { useRuntimeValidation } from './utils/DataFetching/Hooks/useRuntimeValidation';
import { useMappedGrowthVariables } from './utils/DataFetching/Sorting/useMappedGrowthVariables';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { useTrackedEntityInstanceAttributes } from './utils/DataFetching/Hooks/useTrackedEntityInstanceAttributes';
import { useMappedTrackedEntityVariables } from './utils/DataFetching/Sorting/useMappedTrackedEntity';
import { useInvalidProfileValidation } from './utils/DataFetching/Hooks/useInvalidProfileValidation';
import { InvalidProfileValidationWarning } from './UI/InvalidProfileValidationWarning';
import { chartData as chartDataWHO } from './DataSets/WhoStandardDataSets/ChartData';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const [open, setOpen] = useState(true);

    const {
        programId,
        teiId,
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

    const {
        programTrackedEntityAttributeIds,
        isLoading: isLoadingProgramTrackedEntityAttributes,
        isError: isErrorProgramTrackedEntityAttributes,
    } = useProgramTrackedEntityAttributes(programId);

    const runtimeValidation = useRuntimeValidation(isErrorProgramTrackedEntityAttributes);

    const {
        events,
        isLoading: isLoadingEvents,
        isError: isErrorEvents,
    } = useEvents({
        programStageId: chartConfig?.metadata?.programStageForGrowthChart?.[programId],
        programId,
        teiId,
    });

    const programStageId = chartConfig?.metadata?.programStageForGrowthChart?.[programId];
    const {
        programStageDataElementIds,
        isLoading: isLoadingProgramStage,
        isError: isErrorProgramStage,
    } = useProgramStageDataElements(programStageId);

    const genderAttributeId = chartConfig?.metadata?.attributes?.gender;
    const {
        genderOptionCodes,
        isLoading: isLoadingGenderOptions,
    } = useGenderAttributeOptionCodes(genderAttributeId);

    const {
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoading: isLoadingProgramMappings,
    } = useProgramStageMappingValidation(chartConfig?.metadata?.programStageForGrowthChart);

    const configValidation = useConfigValidation(chartConfig, isLoading, isError, {
        programTrackedEntityAttributeIds,
        isLoadingProgramTrackedEntityAttributes,
        programStageDataElementIds,
        isLoadingProgramStage,
        isErrorProgramStage,
        genderOptionCodes,
        isLoadingGenderOptions,
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoadingProgramMappings,
        parentProgramId: programId,
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

    const chartData = useMemo(
        () =>
            chartConfig && customReferences && chartConfig?.settings?.customReferences
                ? customReferences
                : chartDataWHO,
        [chartConfig, customReferences],
    );

    const isPercentiles = chartConfig?.settings?.usePercentiles || false;
    const defaultIndicator = chartConfig?.settings?.defaultIndicator || 'wfa';

    const {
        attributes: teiAttributes,
        isLoading: isLoadingTeiAttributes,
        isError: isErrorTeiAttributes,
    } = useTrackedEntityInstanceAttributes({
        teiId,
        programId,
    });

    const mappedTrackedEntity = useMappedTrackedEntityVariables({
        attributes: teiAttributes,
        variableMappings: chartConfig?.metadata?.attributes,
    });

    const invalidProfileValidation = useInvalidProfileValidation(mappedTrackedEntity);

    const errorView = usePluginErrorHandling({
        isLoading,
        isLoadingRef,
        isLoadingProgramTrackedEntityAttributes,
        isLoadingEvents,
        isLoadingTeiAttributes,
        isErrorTeiAttributes,
        isErrorEvents,
        configValidation,
        runtimeValidation,
        isError,
        customReferencesEnabled: chartConfig?.settings?.customReferences,
        isErrorRef,
    });

    return (
        <QueryClientProvider client={queryClient}>
            <div className='bg-white w-full m-0 p-0'>
                <WidgetCollapsible
                    header={i18n.t('Growth Chart')}
                    borderless={false}
                    open={open}
                    onOpen={() => setOpen(true)}
                    onClose={() => setOpen(false)}
                >
                    {errorView ?? (
                        <>
                            {!invalidProfileValidation.isValid && (
                                <InvalidProfileValidationWarning warnings={invalidProfileValidation.warnings} />
                            )}
                            <GrowthChart
                                trackedEntity={mappedTrackedEntity}
                                measurementData={mappedGrowthVariables ?? []}
                                chartData={chartData}
                                defaultIndicator={defaultIndicator}
                                isPercentiles={isPercentiles}
                            />
                        </>
                    )}
                </WidgetCollapsible>
            </div>
        </QueryClientProvider>
    );
};

export default PluginInner;
