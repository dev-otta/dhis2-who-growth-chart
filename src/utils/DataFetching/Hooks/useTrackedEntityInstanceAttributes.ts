import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';

/**
 * Same Tracker request as Capture’s profile widget (useTrackedEntityInstances):
 * GET tracker/trackedEntities/{teiId}?program={programId}
 * (no explicit fields param — same default projection as Capture).
 */
type Attribute = {
    attribute: string;
    value?: string | null;
};

type UseTrackedEntityInstanceAttributesProps = {
    teiId: string | undefined;
    programId: string | undefined;
};

type UseTrackedEntityInstanceAttributesReturn = {
    attributes: Attribute[] | undefined;
    isLoading: boolean;
    isError: boolean;
};

export const useTrackedEntityInstanceAttributes = ({
    teiId,
    programId,
}: UseTrackedEntityInstanceAttributesProps): UseTrackedEntityInstanceAttributesReturn => {
    const dataEngine = useDataEngine();

    const { data, isLoading, isError } = useQuery({
        queryKey: ['trackedEntityInstanceAttributes', teiId, programId],
        queryFn: () =>
            dataEngine.query({
                trackedEntity: {
                    resource: 'tracker/trackedEntities',
                    id: teiId,
                    params: {
                        program: programId,
                    },
                },
            }),
        enabled: Boolean(teiId && programId),
        staleTime: 5000,
    });

    const raw = handleAPIResponse(RequestedEntities.trackedEntity, data) as
        | { attributes?: Attribute[] }
        | unknown[];

    const attributes =
        Array.isArray(raw) || !raw || typeof raw !== 'object'
            ? undefined
            : raw.attributes;

    const enabled = Boolean(teiId && programId);

    return {
        attributes,
        isLoading: Boolean(enabled && isLoading),
        isError: enabled && isError,
    };
};
