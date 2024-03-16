import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

export type ChartConfig = {
    metadata: {
        attributes: {
            dateOfBirth: string;
            gender: string;
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
        defaultStandard: string;
        zScoreStandard: string;
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
        (): any => dataEngine.query({ chartConfig: { resource: 'dataStore/capture-growth-charts/config' } }),
        { staleTime: 5000 },
    );

    return {
        chartConfig: data?.chartConfig,
        isLoading,
        isError,
    };
};
