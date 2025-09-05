import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';
import { useMemo } from 'react';
import { convertDataElementToValues } from '../Convert';
import { ServerEvent } from '../../../types/Event.types';
import { RequestedEntities, handleAPIResponse } from './handleAPIResponse';
import { ProgramStageConfig } from './useChartConfig';
import { Event } from './useLegacyEvents';

type UseEventsProps = {
    programStages: ProgramStageConfig[] | undefined;
    orgUnitId: string | undefined;
    teiId: string | undefined;
};

interface UseEventsReturn {
    events: Event[] | undefined;
    isLoading: boolean;
    isError: boolean;
    stageHasEvents: boolean;
}

export const useEvents = ({
    programStages,
    orgUnitId,
    teiId,
}: UseEventsProps): UseEventsReturn => {
    const dataEngine = useDataEngine();

    // Create queries only for the specific program stages that are configured
    const programStageIds = useMemo(() => 
        programStages?.map(stage => stage.programStageId) || [], 
        [programStages],
    );

    // Create a stable query key
    const queryKey = useMemo(() => 
        ['growthChartEvents', orgUnitId, JSON.stringify(programStageIds), teiId],
        [orgUnitId, programStageIds, teiId],
    );

    const {
        data,
        isLoading,
        isError,
    } = useQuery(
        queryKey, 
        async (): Promise<any> => {
            if (!programStages || programStages.length === 0) {
                return { allEvents: [] };
            }

            // Only fetch events from the explicitly configured program stages
            const queries = programStages.map((stageConfig, index) => ({
                [`events_${index}`]: {
                    resource: 'tracker/events',
                    params: () => ({
                        fields: 'event,status,program,dataValues,occurredAt,programStage',
                        program: stageConfig.programId,
                        programStage: stageConfig.programStageId,
                        orgUnit: orgUnitId,
                        trackedEntity: teiId,
                    }),
                },
            }));

            // Combine all queries into a single object
            const combinedQuery = queries.reduce((acc, query) => ({ ...acc, ...query }), {});

            const result = await dataEngine.query(combinedQuery);
            
            // Combine events only from the configured program stages
            const allEvents: any[] = [];
            Object.keys(result).forEach(key => {
                const stageEvents = handleAPIResponse(RequestedEntities.events, result[key]);
                if (stageEvents) {
                    // Filter to ensure we only include events from configured stages
                    const filteredEvents = stageEvents.filter((event: any) => 
                        programStageIds.includes(event.programStage),
                    );
                    allEvents.push(...filteredEvents);
                }
            });

            return { allEvents };
        }, 
        { 
            staleTime: 5000,
            enabled: !!programStages && programStages.length > 0 && !!orgUnitId && !!teiId,
        },
    );

    const events = useMemo(() => {
        if (!data?.allEvents) return undefined;
        
        return data.allEvents.map((event: ServerEvent) => {
            const dataValues = convertDataElementToValues(event?.dataValues);
            return {
                ...event,
                dataValues,
            };
        });
    }, [data]);

    const stageHasEvents = useMemo(() => events?.length !== 0, [events]);

    return {
        events,
        isLoading,
        isError,
        stageHasEvents,
    };
};
