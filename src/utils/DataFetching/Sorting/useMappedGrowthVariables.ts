import { DataValue, Event } from '../Hooks/useEvents';

export interface MappedDataValue {
    eventDate: string;
    dataValues: DataValue;
}

interface UseMappedGrowthVariablesProps {
    events: Event[];
    growthVariables: { [key: string]: string };
}

export const useMappedGrowthVariables = ({
    events,
    growthVariables,
}: UseMappedGrowthVariablesProps): MappedDataValue[] | undefined => events?.map((event: Event) => {
    const dataValueMap: DataValue = {};

    Object.entries(growthVariables).reduce((acc, [key, value]: [string, string]) => {
        const dataValue = Number(Object.entries(event.dataValues).find(([dataElement]) => dataElement === value)?.[1]);
        if (dataValue && value) acc[key] = dataValue;
        return acc;
    }, dataValueMap);

    const eventDate = String(event.occurredAt).split('T')[0];

    return { eventDate, dataValues: dataValueMap };
});
