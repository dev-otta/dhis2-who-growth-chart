import { Event } from '../Hooks/useEvents';

interface UseMappedGrowthVariablesProps {
    events: Event[];
    // Map of variable name -> dataElement UID (string)
    growthVariables: { [key: string]: string | undefined };
    isWeightInGrams: boolean;
}

export interface MappedDataValue {
    eventDate: string;
    dataValues: {
        weight: number;
        headCircumference: number;
        height: number;
    };
}

export const useMappedGrowthVariables = ({
    events,
    growthVariables,
    isWeightInGrams,
}: UseMappedGrowthVariablesProps): MappedDataValue[] | undefined => {
    if (!events || !Array.isArray(events)) {
        return undefined;
    }

    const mappedData = events.map((event: Event) => {
        const dataValueMap: { 
            weight: number | undefined; 
            headCircumference: number | undefined; 
            height: number | undefined; 
            [key: string]: number | undefined 
        } = {
            weight: undefined,
            headCircumference: undefined,
            height: undefined,
        };

        if (growthVariables && event.dataValues) {
            Object.entries(growthVariables).reduce((acc, [key, dataElementUid]: [string, string | undefined]) => {
                if (!dataElementUid) return acc;
                const raw = (event.dataValues as Record<string, unknown>)[dataElementUid];
                const dataValue = raw != null ? Number(raw) : undefined;
                if (typeof dataValue === 'number' && !Number.isNaN(dataValue)) {
                    acc[key] = (key === 'weight' && (isWeightInGrams || dataValue > 1000)) ? dataValue / 1000 : dataValue;
                }
                return acc;
            }, dataValueMap);
        }

        const eventDate = String(event.occurredAt).split('T')[0];

        return { eventDate, dataValues: dataValueMap };
    });

    return mappedData?.sort((a, b) => a.eventDate.localeCompare(b.eventDate));
};
