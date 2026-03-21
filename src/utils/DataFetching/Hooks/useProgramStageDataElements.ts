import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

interface UseProgramStageDataElementsReturn {
    programStageDataElementIds: string[];
    isLoading: boolean;
}

export const useProgramStageDataElements = (
    programStageId: string | undefined,
): UseProgramStageDataElementsReturn => {
    const dataEngine = useDataEngine();

    const { data, isLoading } = useQuery({
        queryKey: ['programStageDataElements', programStageId],
        queryFn: (): any =>
            dataEngine.query({
                programStage: {
                    resource: `programStages/${programStageId}`,
                    params: {
                        fields: 'programStageDataElements[dataElement[id]]',
                    },
                },
            }),
        enabled: !!programStageId,
        staleTime: 5000,
    });

    const programStageDataElementIds: string[] =
        (data?.programStage?.programStageDataElements ?? [])
            .map((entry: { dataElement?: { id?: string } }) => entry?.dataElement?.id)
            .filter((id: unknown): id is string => typeof id === 'string' && id.length > 0);

    return {
        programStageDataElementIds,
        isLoading: Boolean(programStageId && isLoading),
    };
};
