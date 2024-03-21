import { useQuery } from 'react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useMemo } from 'react';
import { convertDataElementToValues } from '../Convert';
import { ServerEvent } from '../../../types/Event.types';

type UseEventsByProgramStageProps = {
    programId: string | undefined;
    teiId: string | undefined;
};

export type DataValue = {
    [key: string]: string | number;
};

export type MeasurementData = {
    eventDate: string;
    dataValues: DataValue;
};

export interface Event {
    dataValues: DataValue[];
    occurredAt: string;
    event: string;
    program: string;
    programStage: string;
    status: 'ACTIVE' | 'COMPLETED';
}

interface UseEventsByProgramStageReturn {
    events: Event[] | undefined;
    isLoading: boolean;
    isError: boolean;
    stageHasEvents: boolean;
}

export const useEvents = ({
    programId,
    teiId,
}: UseEventsByProgramStageProps): UseEventsByProgramStageReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery(['eventsByProgramStage', programId, teiId], (): any => dataEngine.query({
        eventsByProgramStage: {
            resource: 'tracker/events',
            params: ({
                programId,
                teiId,
            }) => ({
                program: programId,
                trackedEntity: teiId,
            }),
        },
    }, {
        variables: {
            teiId,
            programId,
        },
    }), { staleTime: 5000 });

    const events = useMemo(() => data?.eventsByProgramStage?.instances?.map((event: ServerEvent) => {
        const dataValues = convertDataElementToValues(event?.dataValues);
        return {
            ...event,
            dataValues,
        };
    }), [data]);

    const stageHasEvents = useMemo(() => events?.length !== 0, [events]);

    return {
        events,
        isLoading,
        isError,
        stageHasEvents,
    };
};
