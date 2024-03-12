import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

export type ChartConfig = {
    childVariables: {
        gender: string;
        dateOfBirth: string;
    };
    stageVariables: {
        programStageId: string;
    };
    growthVariables: {
        Height: string;
        Weight: string;
        Length: string;
        HeadCircumference: string;
    };
    settings: {
        zScoreStandard: string;
        defaultStandard: string;
    };
};

export const useChartConfig = () => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery('chartConfig', () => dataEngine.query({ chartConfig: { resource: 'dataStore/capture/growthChartConfig' } }), { staleTime: 5000 });

    return {
        chartConfig: data?.chartConfig as ChartConfig,
        isLoading,
        isError,
    };
};
