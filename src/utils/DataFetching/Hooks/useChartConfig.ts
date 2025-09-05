import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

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
        programStages: ProgramStageConfig[];
    };
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
    } = useQuery({
        queryKey: ['chartConfig'],
        queryFn: (): any =>
            dataEngine.query({ chartConfig: { resource: 'dataStore/CaptureGrowthChart/config' } }),
        staleTime: 5000,
    });

    return {
        chartConfig: data?.chartConfig as ChartConfig | undefined,
        isLoading,
        isError,
    };
};
