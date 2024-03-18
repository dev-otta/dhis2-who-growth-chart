import { ChartConfig } from '../Hooks/useChartConfig';
import { TrackedEntity } from '../Hooks/useTeiById';

interface Attribute {
    [key: string]: string;
}

type ChartConfigAttributes = ChartConfig['metadata']['attributes'] & { [key: string]: string };

interface UseMappedTrackedEntityVariablesProps {
    trackedEntity: TrackedEntity;
    trackedEntityAttributes: Attribute[];
    variableMappings: ChartConfig['metadata']['attributes'];
}

export const useMappedTrackedEntityVariables = ({
    trackedEntity,
    trackedEntityAttributes,
    variableMappings,
}: UseMappedTrackedEntityVariablesProps): ChartConfigAttributes => {
    const mappedValues: ChartConfigAttributes = {
        dateOfBirth: undefined,
        gender: undefined,
    };
    if (!trackedEntity || !trackedEntityAttributes || !variableMappings) {
        return mappedValues;
    }

    return Object.entries(variableMappings).reduce((acc, [key, attributeId]) => {
        const attribute = trackedEntityAttributes.find((attr: Attribute) => attr.attribute === attributeId);
        if (attribute) {
            const value = trackedEntity.attributes.find((attr: Attribute) => attr.attribute === attributeId)?.value;
            if (value !== undefined && value !== null) {
                acc[key] = value;
            }
        }
        return acc;
    }, mappedValues);
};
