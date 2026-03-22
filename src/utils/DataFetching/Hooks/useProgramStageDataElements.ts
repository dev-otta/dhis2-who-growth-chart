import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

const DHIS2_UID_REGEX = /^[a-zA-Z][a-zA-Z0-9]{10}$/;

const isValidProgramStageUid = (id: string | undefined): id is string =>
    typeof id === 'string' && DHIS2_UID_REGEX.test(id);

interface UseProgramStageDataElementsReturn {
    programStageDataElementIds: string[];
    isLoading: boolean;
    isError: boolean;
}

export const useProgramStageDataElements = (
    programStageId: string | undefined,
): UseProgramStageDataElementsReturn => {
    const dataEngine = useDataEngine();

    const queryEnabled = isValidProgramStageUid(programStageId);

    const { data, isLoading, isError } = useQuery({
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
        enabled: queryEnabled,
        staleTime: 5000,
    });

    const programStageDataElementIds: string[] =
        (data?.programStage?.programStageDataElements ?? [])
            .map((entry: { dataElement?: { id?: string } }) => entry?.dataElement?.id)
            .filter((id: unknown): id is string => typeof id === 'string' && id.length > 0);

    return {
        programStageDataElementIds,
        isLoading: Boolean(queryEnabled && isLoading),
        isError: queryEnabled && isError,
    };
};
