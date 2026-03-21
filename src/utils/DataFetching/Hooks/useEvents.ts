import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useMemo } from 'react';
import { convertDataElementToValues } from '../Convert';
import { ServerEvent } from '../../../types/Event.types';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';

type UseEventsByProgramStageProps = {
    programStageId: string | undefined;
    orgUnitId: string | undefined;
    programId: string | undefined;
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
    orgUnitId,
    programId,
}: UseEventsByProgramStageProps): UseEventsByProgramStageReturn => {
    const dataEngine = useDataEngine();
    const {
        data,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['eventsByProgramStage', orgUnitId, programStageId, programId],
        queryFn: (): any => dataEngine.query({
            eventsByProgramStage: {
                resource: 'tracker/events',
                params: ({
                    orgUnitId,
                    programStageId,
                    programId,
                }) => ({
                    fields: 'event,status,program,dataValues,occurredAt,programStage',
                    program: programId,
                    programStage: programStageId,
                    orgUnit: orgUnitId,
                }),
            },
        }, {
            variables: {
                orgUnitId,
                programStageId,
                programId,
            },
        }),
        staleTime: 5000,
        enabled: !!programStageId && !!orgUnitId && !!programId,
    });
    
    const apiResponse = handleAPIResponse(RequestedEntities.events, data?.eventsByProgramStage);

    const events = useMemo(() => apiResponse?.map((event: ServerEvent) => {
        const dataValues = convertDataElementToValues(event?.dataValues);
        return {
            ...event,
            dataValues,
        };
    }), [apiResponse]);

    const stageHasEvents = useMemo(() => events?.length !== 0, [events]);

    return {
        events,
        isLoading,
        isError,
        stageHasEvents,
    };
};
