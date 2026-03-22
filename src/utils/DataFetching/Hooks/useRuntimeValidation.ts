import { useMemo } from 'react';
import { ValidationError } from './useConfigValidation';

export interface RuntimeValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

export const useRuntimeValidation = (
    isErrorProgramTrackedEntityAttributes?: boolean,
): RuntimeValidationResult => {
    const validation = useMemo((): RuntimeValidationResult => {
        const errors: ValidationError[] = [];

        if (isErrorProgramTrackedEntityAttributes) {
            errors.push({
                field: 'programTrackedEntityAttributes',
                message:
                    'Could not load tracked entity attributes for this program. Check access to the program metadata.',
            });
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }, [isErrorProgramTrackedEntityAttributes]);

    return validation;
};
