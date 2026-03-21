import { GenderCodes } from '../../../types/chartDataTypes';
import { ChartConfig } from '../Hooks/useChartConfig';

interface Attribute {
    [key: string]: string;
}

export interface MappedEntityValues {
    dateOfBirth: string | undefined;
    gender: string | undefined;
    firstName: string | undefined;
    lastName: string | undefined;
    [key: string]: string | undefined;
}

interface UseMappedTrackedEntityVariablesProps {
    attributes: Attribute[] | undefined;
    variableMappings: ChartConfig['metadata']['attributes'];
}

export const useMappedTrackedEntityVariables = ({
    attributes,
    variableMappings,
}: UseMappedTrackedEntityVariablesProps): MappedEntityValues => {
    const mappedValues: MappedEntityValues = {
        dateOfBirth: undefined,
        gender: undefined,
        firstName: undefined,
        lastName: undefined,
    };

    if (!attributes || !variableMappings) {
        return mappedValues;
    }

    return Object.entries(variableMappings)
        .reduce((acc, [key, attributeId]) => {
            const attribute = attributes.find((attr: Attribute) => attr.attribute === attributeId);
            if (attribute) {
                const value = attribute.value;
                if (value !== undefined && value !== null) {
                    if (key === 'gender') {
                        if (value === String(variableMappings.femaleOptionCode)) {
                            acc.gender = GenderCodes.CGC_Female;
                        }
                        if (value === String(variableMappings.maleOptionCode)) {
                            acc.gender = GenderCodes.CGC_Male;
                        }
                        return acc;
                    }
                    acc[key] = value;
                }
            }
            return acc;
        }, mappedValues);
};
