import { useQuery } from 'react-query';
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
            programStageId: string;
        };
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
    } = useQuery(
        'chartConfig',
        (): any =>
            dataEngine.query({ chartConfig: { resource: 'dataStore/capture-growth-chart/config' } }),
        { staleTime: 5000 },
    );

    return {
        chartConfig: data?.chartConfig,
        isLoading,
        isError,
    };
};
