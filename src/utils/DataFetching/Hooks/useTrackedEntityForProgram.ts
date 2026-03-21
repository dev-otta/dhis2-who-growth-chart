import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';

type UseTrackedEntityForProgramProps = {
    teiId: string | undefined;
    programId: string | undefined;
};

type Attribute = {
    [key: string]: string;
};

export type TrackedEntity = {
    trackedEntity: string;
    trackedEntityType: string;
    createdAt: string;
    createdAtClient: string;
    updatedAt: string;
    orgUnit: string;
    inactive: boolean;
    deleted: boolean;
    potentialDuplicate: boolean;
    attributes: Attribute[];
};

type UseTrackedEntityForProgramReturn = {
    trackedEntity: TrackedEntity | undefined;
    isLoading: boolean;
    isError: boolean;
};

export const useTrackedEntityForProgram = ({
    teiId,
    programId,
}: UseTrackedEntityForProgramProps): UseTrackedEntityForProgramReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['trackedEntityForProgram', teiId, programId],
        queryFn: () => dataEngine.query({
            trackedEntity: {
                resource: 'tracker/trackedEntities',
                id: teiId,
                params: {
                    program: programId,
                    fields: 'attributes',
                },
            },
        }),
        staleTime: 5000,
    });

    const apiResponse: TrackedEntity = handleAPIResponse(RequestedEntities.trackedEntity, data);

    return {
        trackedEntity: apiResponse,
        isLoading,
        isError,
    };
};
