import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

type ProgramTrackedEntityAttributeRow = {
    trackedEntityAttribute?: { id?: string } | null;
};

export type ProgramTrackedEntityAttributeIds = string[];

type UseProgramTrackedEntityAttributesReturn = {
    programTrackedEntityAttributeIds: ProgramTrackedEntityAttributeIds;
    isLoading: boolean;
    isError: boolean;
};

export const useProgramTrackedEntityAttributes = (
    programId: string | undefined,
): UseProgramTrackedEntityAttributesReturn => {
    const dataEngine = useDataEngine();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['programTrackedEntityAttributes', programId],
        queryFn: () =>
            dataEngine.query({
                program: {
                    resource: 'programs',
                    id: programId,
                    params: {
                        fields: 'programTrackedEntityAttributes[trackedEntityAttribute[id]]',
                    },
                },
            }),
        enabled: !!programId,
        staleTime: 5000,
    });

    const programPayload = data?.program as
        | { programTrackedEntityAttributes?: ProgramTrackedEntityAttributeRow[] }
        | undefined;

    const rows: ProgramTrackedEntityAttributeRow[] =
        programPayload?.programTrackedEntityAttributes ?? [];

    const programTrackedEntityAttributeIds: ProgramTrackedEntityAttributeIds = rows
        .map((e) => e.trackedEntityAttribute?.id)
        .filter((id): id is string => typeof id === 'string' && id.length > 0);

    return {
        programTrackedEntityAttributeIds,
        isLoading,
        isError,
    };
};
