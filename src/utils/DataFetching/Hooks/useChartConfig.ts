import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

export type ChartConfig = {
    metadata: {
        attributes: {
            dateOfBirth: string;
            gender: string;
            femaleOptionCode: string;
            maleOptionCode: string;
        };
        dataElements: {
            headCircumference: string;
            height: string;
            weight: string;
        };
        program: {
            programStageId: string | string[];
        };
    };
    settings: {
        customReferences: boolean;
        usePercentiles: boolean;
        weightInGrams: boolean;
        defaultIndicator: string;
    };
};

export const useChartConfig = (configKey: string = 'config') => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(
        ['chartConfig', configKey],
        (): any =>
            dataEngine.query({ chartConfig: { resource: `dataStore/CaptureGrowthChart/${configKey}` } }),
        { staleTime: 5000 },
    );

    return {
        chartConfig: data?.chartConfig,
        isLoading,
        isError,
    };
};
