import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

type UseEventByIdProps = {
    teiId: string | undefined;
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

type UseEventByIdReturn = {
    trackedEntity: TrackedEntity | undefined;
    isLoading: boolean;
    isError: boolean;
};

export const useTeiById = ({ teiId }: UseEventByIdProps): UseEventByIdReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(['teilById', teiId], () => dataEngine.query({
        eventById: {
            resource: 'tracker/trackedEntities',
            id: ({ teiId }) => teiId,
        },
    }, { variables: { teiId } }), { staleTime: 5000 });

    return {
        trackedEntity: data?.eventById as TrackedEntity,
        isLoading,
        isError,
    };
};
