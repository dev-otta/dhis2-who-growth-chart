import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useConfigNormalization } from './useConfigNormalization';

export type ProgramStageConfig = {
    programId: string;
    programStageId: string;
};

export type ChartConfig = {
    metadata: {
        attributes: {
            dateOfBirth: string;
            gender: string;
            firstName: string;
            lastName: string;
            femaleOptionCode: string;
            maleOptionCode: string;
        };
        dataElements: {
            headCircumference: string;
            height: string;
            weight: string;
        };
    };
    programStages: ProgramStageConfig[]; // Moved to top level - simpler!
    settings: {
        customReferences: boolean;
        usePercentiles: boolean;
        weightInGrams: boolean;
        defaultIndicator: string;
    };
};

export const useChartConfig = () => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(
        ['chartConfig'],
        (): any =>
            dataEngine.query({ chartConfig: { resource: 'dataStore/CaptureGrowthChart/config' } }),
        { staleTime: 5000 },
    );

    // Normalize config to standard format if needed
    const normalizedConfig = useConfigNormalization(data?.chartConfig);

    return {
        chartConfig: normalizedConfig,
        isLoading,
        isError,
    };
};
