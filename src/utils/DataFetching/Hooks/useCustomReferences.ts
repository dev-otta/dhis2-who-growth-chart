import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

export const useCustomReferences = () => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(
        'customReferences',
        (): any => dataEngine.query({ customReferences: { resource: 'dataStore/capture-growth-charts/customReference' } }),
        { staleTime: 5000 },
    );

    return {
        customReferences: data?.customReferences,
        isLoading,
        isError,
    };
};
