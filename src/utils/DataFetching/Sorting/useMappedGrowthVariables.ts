import { Event, DataValue } from '../Hooks/useEvents';

export interface MappedDataValues {
    eventDate: string;
    dataValues: DataValue;
}[];

interface UseMappedGrowthVariablesProps {
    events: Event[];
    growthVariables: { [key: string]: string };
}

export const useMappedGrowthVariables = ({
    events,
    growthVariables,
}: UseMappedGrowthVariablesProps): { eventDate: string; dataValues: { [key: string]: string } }[] | undefined => {
    const mappedDataValues = events?.map((event) => {
        const dataValueMap = event.dataValues.reduce((acc: { [key: string]: string }, dataValue: DataValue) => {
            const key = Object.keys(growthVariables).find((key) => growthVariables[key] === dataValue.dataElement);
            if (key) {
                acc[key] = dataValue.value;
            }
            return acc;
        }, {});

        const eventDate = event.eventDate.split('T')[0];

        return { eventDate, dataValues: dataValueMap };
    });
    return mappedDataValues;
};
