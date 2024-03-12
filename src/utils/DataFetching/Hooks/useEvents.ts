import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';

type UseEventsByProgramStageProps = {
    programStageId: string | undefined;
    orgUnitId: string | undefined;
    programId: string | undefined;
};

export type GrowthEvent = {
    eventDate: string;
    height: number;
    weight: number;
    headCircumference: number;
};

export type DataValue = {
    [key: string]: string;
};

export type Event = {
    dataValues: DataValue[];
    eventDate: string;
    [key: string]: string | boolean | DataValue[];};

interface QueryData {
    events: {
        events: Event[];
    };
}

interface UseEventsByProgramStageReturn {
    events: Event[] | undefined;
    isLoading: boolean;
    isError: boolean;
}

export const useEventsByProgramStage = ({ orgUnitId, programId, programStageId }: UseEventsByProgramStageProps): UseEventsByProgramStageReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(['eventsByProgramStage', orgUnitId, programStageId, programId], () => dataEngine.query({
        events: {
            resource: 'events',
            params: {
                orgUnit: orgUnitId,
                programStage: programStageId,
                program: programId,
            },
        },
    }), { staleTime: 5000 });

    const events = ((data as unknown) as QueryData)?.events.events as Event[];

    return {
        events,
        isLoading,
        isError,
    };
};
