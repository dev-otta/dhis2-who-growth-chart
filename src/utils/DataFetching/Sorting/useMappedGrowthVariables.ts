import { Event } from '../Hooks/useEvents';

interface UseMappedGrowthVariablesProps {
    events: Event[];
    growthVariables: { [key: string]: string };
}

export interface MappedDataValue {
    eventDate: string;
    dataValues: {
        weight: string;
        headCircumference: string;
        height: string;
    };
}

export const useMappedGrowthVariables = ({
    events,
    growthVariables,
}: UseMappedGrowthVariablesProps): MappedDataValue[] | undefined => events?.map((event: Event) => {
    const dataValueMap: { weight: string; headCircumference: string; height: string; [key: string]: string } = {
        weight: '',
        headCircumference: '',
        height: '',
    };

    if (growthVariables && event.dataValues) {
        Object.entries(growthVariables).reduce((acc, [key, value]: [string, string]) => {
            const dataValue = String(Object.entries(event.dataValues).find(([dataElement]) => dataElement === value)?.[1]);
            if (dataValue && value) acc[key] = dataValue;
            return acc;
        }, dataValueMap);
    }

    const eventDate = String(event.occurredAt).split('T')[0];

    return { eventDate, dataValues: dataValueMap };
});
