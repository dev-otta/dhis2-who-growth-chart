import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

export const useCustomReferences = (enabled: boolean = true) => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['customReferences'],
        queryFn: (): any => dataEngine.query({ customReferences: { resource: 'dataStore/CaptureGrowthChart/customReferences' } }),
        staleTime: 5000,
        enabled: enabled,
    });

    return {
        customReferences: data?.customReferences,
        isLoading: enabled ? isLoading : false, // Force isLoading to false when disabled
        isError,
    };
};
