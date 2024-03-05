import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

type UseEventByIdProps = {
    teiId: string | undefined;
};
type UseEventByIdReturn = {
  trackedEntitie: any;
  isLoading: boolean;
};
export const useTeiById = ({ teiId }: UseEventByIdProps): UseEventByIdReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
    } = useQuery(['teilById', teiId], (): any => dataEngine.query({
        eventById: {
            resource: 'tracker/trackedEntities',
            id: ({ teiId }) => teiId,
        },
    }, { variables: { teiId } }), { staleTime: 5000 });
    return {
        trackedEntitie: data?.eventById,
        isLoading,
    };
};
