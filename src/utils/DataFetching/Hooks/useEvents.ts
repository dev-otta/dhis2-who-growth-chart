import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useMemo } from 'react';
import { convertDataElementToValues } from '../Convert';
import { ServerEvent } from '../../../types/Event.types';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';

type UseEventsByProgramStageProps = {
    programStageId: string | undefined;
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
    dataValues: { [key: string]: string };
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
    programStageId,
    programId,
    teiId,
}: UseEventsByProgramStageProps): UseEventsByProgramStageReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['eventsByProgramStage', programStageId, programId, teiId],
        queryFn: (): any => dataEngine.query({
            eventsByProgramStage: {
                resource: 'tracker/events',
                params: ({
                    programStageId,
                    programId,
                    teiId: trackedEntityId,
                }) => ({
                    fields: 'event,status,program,dataValues,occurredAt,programStage',
                    program: programId,
                    programStage: programStageId,
                    trackedEntity: trackedEntityId,
                }),
            },
        }, {
            variables: {
                programStageId,
                programId,
                teiId,
            },
        }),
        staleTime: 5000,
        enabled: !!programStageId && !!programId && !!teiId,
    });

    const apiResponse = handleAPIResponse(RequestedEntities.events, data?.eventsByProgramStage);

    const events = useMemo(() => apiResponse?.map((event: ServerEvent) => {
        const dataValues = convertDataElementToValues(event?.dataValues);
        return {
            ...event,
            dataValues,
        };
    }), [apiResponse]);

    const stageHasEvents = useMemo(() => Boolean(events?.length), [events]);

    return {
        events,
        isLoading,
        isError: !!programStageId && !!programId && !!teiId && isError,
        stageHasEvents,
    };
};
