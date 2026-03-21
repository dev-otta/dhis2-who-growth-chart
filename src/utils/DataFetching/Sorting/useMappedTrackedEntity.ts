import { useMemo } from 'react';
import { GenderCodes } from '../../../types/chartDataTypes';
import { MappedEntityValues } from '../../../types/mappedEntityValues';
import { ChartConfig } from '../Hooks/useChartConfig';

interface Attribute {
    [key: string]: string;
}

interface UseMappedTrackedEntityVariablesProps {
    attributes: Attribute[] | undefined;
    variableMappings: ChartConfig['metadata']['attributes'] | undefined;
}

export const useMappedTrackedEntityVariables = ({
    attributes,
    variableMappings,
}: UseMappedTrackedEntityVariablesProps): MappedEntityValues => {
    return useMemo(() => {
        const mappedValues: MappedEntityValues = {
            dateOfBirth: undefined,
            gender: undefined,
            firstName: undefined,
            lastName: undefined,
        };

        if (!attributes || !variableMappings) {
            return mappedValues;
        }

        const keys: Array<'dateOfBirth' | 'gender' | 'firstName' | 'lastName'> = [
            'dateOfBirth',
            'gender',
            'firstName',
            'lastName',
        ];

        return keys.reduce((acc, key) => {
            const attributeId = variableMappings[key];
            const attribute = attributes.find((attr: Attribute) => attr.attribute === attributeId);
            if (!attribute) {
                return acc;
            }
            const value = attribute.value;
            if (value === undefined || value === null) {
                return acc;
            }
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
            return acc;
        }, mappedValues);
    }, [attributes, variableMappings]);
};
