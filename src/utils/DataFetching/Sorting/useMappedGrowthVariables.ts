import { Event } from '../Hooks/useEvents';

interface UseMappedGrowthVariablesProps {
    events: Event[];
    growthVariables: { [key: string]: number | undefined };
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
        const dataValueMap: { weight: number; headCircumference: number; height: number; [key: string]: number } = {
            weight: undefined,
            headCircumference: undefined,
            height: undefined,
        };

        if (growthVariables && event.dataValues) {
            Object.entries(growthVariables).reduce((acc, [key, value]: [string, number | undefined]) => {
                const dataValue = Number(Object.entries(event.dataValues).find(([dataElement]) => dataElement === String(value))?.[1]);
                if (dataValue && value) {
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
