import React, { useMemo, useState } from 'react';
import './Plugin.css';
import './tailwind.css';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import i18n from '@dhis2/d2-i18n';
import { WidgetCollapsible } from './components/WidgetCollapsible';
import { GrowthChart } from './components/GrowthChart/GrowthChart';
import { EnrollmentOverviewProps } from './Plugin.types';
import { useChartConfig, usePluginErrorHandling, useTrackedEntityForProgram } from './utils/DataFetching/Hooks';
import { useEvents } from './utils/DataFetching/Hooks/useEvents';
import { useProgramStageDataElements } from './utils/DataFetching/Hooks/useProgramStageDataElements';
import { useGenderAttributeOptionCodes } from './utils/DataFetching/Hooks/useGenderAttributeOptionCodes';
import { useProgramStageMappingValidation } from './utils/DataFetching/Hooks/useProgramStageMappingValidation';
import { useConfigValidation } from './utils/DataFetching/Hooks/useConfigValidation';
import { useRuntimeValidation } from './utils/DataFetching/Hooks/useRuntimeValidation';
import { useMappedGrowthVariables } from './utils/DataFetching/Sorting/useMappedGrowthVariables';
import { useMappedTrackedEntityVariables } from './utils/DataFetching/Sorting/useMappedTrackedEntity';
import { useCustomReferences } from './utils/DataFetching/Hooks/useCustomReferences';
import { chartData as chartDataWHO } from './DataSets/WhoStandardDataSets/ChartData';

const queryClient = new QueryClient();

const PluginInner = (propsFromParent: EnrollmentOverviewProps) => {
    const [open, setOpen] = useState(true);

    const {
        teiId,
        orgUnitId,
        programId,
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
        trackedEntity,
        isLoading: isLoadingTei,
        isError: isErrorTei,
    } = useTrackedEntityForProgram({ teiId, programId });

    const runtimeValidation = useRuntimeValidation(teiId, orgUnitId, isErrorTei);

    const {
        events,
        isLoading: isLoadingEvents,
    } = useEvents({
        programStageId: chartConfig?.metadata?.programStageForGrowthChart?.[programId],
        programId,
        orgUnitId,
        teiId,
    });

    const trackedEntityAttributeIds = useMemo(
        () => (trackedEntity?.attributes ?? [])
            .map((attribute) => attribute.attribute)
            .filter((id): id is string => typeof id === 'string' && id.length > 0),
        [trackedEntity?.attributes],
    );

    const programStageId = chartConfig?.metadata?.programStageForGrowthChart?.[programId];
    const {
        programStageDataElementIds,
        isLoading: isLoadingProgramStage,
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
        trackedEntityAttributeIds,
        programStageDataElementIds,
        isLoadingTrackedEntity: isLoadingTei,
        isLoadingProgramStage,
        genderOptionCodes,
        isLoadingGenderOptions,
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoadingProgramMappings,
        parentProgramId: programId,
    });

    const mappedTrackedEntity = useMappedTrackedEntityVariables({
        variableMappings: chartConfig?.metadata?.attributes,
        attributes: trackedEntity?.attributes,
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

    const errorView = usePluginErrorHandling({
        isLoading,
        isLoadingRef,
        isLoadingTei,
        isLoadingEvents,
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
