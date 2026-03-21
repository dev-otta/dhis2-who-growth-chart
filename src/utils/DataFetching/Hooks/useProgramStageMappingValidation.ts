import { useMemo } from 'react';
import { useQueries } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

const DHIS2_UID_REGEX = /^[a-zA-Z][a-zA-Z0-9]{10}$/;

const isValidUid = (value: string | undefined): boolean =>
    typeof value === 'string' && DHIS2_UID_REGEX.test(value);

interface UseProgramStageMappingValidationReturn {
    programStageIdsByProgramId: Record<string, string[]>;
    programIdsFailedToLoad: string[];
    isLoading: boolean;
}

export const useProgramStageMappingValidation = (
    programStageForGrowthChart: Record<string, string> | undefined,
): UseProgramStageMappingValidationReturn => {
    const dataEngine = useDataEngine();

    const programIds = useMemo(() => {
        if (
            !programStageForGrowthChart ||
            typeof programStageForGrowthChart !== 'object' ||
            Array.isArray(programStageForGrowthChart)
        ) {
            return [];
        }
        return Object.keys(programStageForGrowthChart).filter(isValidUid);
    }, [programStageForGrowthChart]);

    const queries = useQueries({
        queries: programIds.map((programId) => ({
            queryKey: ['programProgramStages', programId],
            queryFn: () =>
                dataEngine.query({
                    program: {
                        resource: `programs/${programId}`,
                        params: {
                            fields: 'programStages[id]',
                        },
                    },
                }) as Promise<{
                    program?: { programStages?: Array<{ id?: string }> };
                }>,
            enabled: !!programId,
            staleTime: 5000,
        })),
    });

    const isLoading = programIds.length > 0 && queries.some((q) => q.isLoading);

    const programStageIdsByProgramId: Record<string, string[]> = {};
    const programIdsFailedToLoad: string[] = [];

    programIds.forEach((programId, i) => {
        const q = queries[i];
        if (!q || q.isLoading) {
            return;
        }
        if (q.isError) {
            programIdsFailedToLoad.push(programId);
            return;
        }
        const stages = q.data?.program?.programStages;
        programStageIdsByProgramId[programId] = Array.isArray(stages)
            ? stages
                  .map((s) => s?.id)
                  .filter((id): id is string => typeof id === 'string' && id.length > 0)
            : [];
    });

    return {
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoading,
    };
};
