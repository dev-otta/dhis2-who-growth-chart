import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useMemo } from 'react';
import { convertDataElementToValues } from '../Convert';
import { ServerEvent } from '../../../types/Event.types';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';

type UseEventsByProgramStageProps = {
    programStageId: string | string[] | undefined;
    orgUnitId: string | undefined;
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
    orgUnitId,
    programId,
    programStageId,
    teiId,
}: UseEventsByProgramStageProps): UseEventsByProgramStageReturn => {
    const dataEngine = useDataEngine();

    // Normalize programStageId to always be an array for consistent handling
    const programStageIds = useMemo(() => {
        if (!programStageId) return [];
        return Array.isArray(programStageId) ? programStageId : [programStageId];
    }, [programStageId]);

    const {
        data,
        isLoading,
        isError,
    } = useQuery(['eventsByProgramStage', orgUnitId, programStageIds, programId, teiId], (): any => {
        if (programStageIds.length > 1) {
            const queries = programStageIds.reduce((acc, stageId, index) => {
                acc[`eventsByProgramStage_${index}`] = {
                    resource: 'tracker/events',
                    params: {
                        fields: 'event,status,program,dataValues,occurredAt,programStage',
                        program: programId,
                        programStage: stageId,
                        orgUnit: orgUnitId,
                        trackedEntity: teiId,
                    },
                };
                return acc;
            }, {} as any);
            return dataEngine.query(queries);
        }
        if (programStageIds.length === 1) {
            // Single program stage - use the existing logic
            return dataEngine.query({
                eventsByProgramStage: {
                    resource: 'tracker/events',
                    params: {
                        fields: 'event,status,program,dataValues,occurredAt,programStage',
                        program: programId,
                        programStage: programStageIds[0],
                        orgUnit: orgUnitId,
                        trackedEntity: teiId,
                    },
                },
            });
        }
        // No program stages provided
        return Promise.resolve({});
    }, { staleTime: 5000 });

    const apiResponse = useMemo(() => {
        if (!data) return [];

        if (programStageIds.length > 1) {
            // Combine events from multiple program stages
            const allEvents: any[] = [];
            Object.keys(data).forEach((key) => {
                if (key.startsWith('eventsByProgramStage_')) {
                    const stageEvents = handleAPIResponse(RequestedEntities.events, data[key]);
                    if (stageEvents) {
                        allEvents.push(...stageEvents);
                    }
                }
            });
            return allEvents;
        }
        // Single program stage
        return handleAPIResponse(RequestedEntities.events, data?.eventsByProgramStage) || [];
    }, [data, programStageIds.length]);

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
