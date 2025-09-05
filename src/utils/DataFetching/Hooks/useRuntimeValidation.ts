import { useMemo } from 'react';
import { ValidationError } from './useConfigValidation';

export interface RuntimeValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

export const useRuntimeValidation = (
    teiId: string | undefined,
    orgUnitId: string | undefined,
): RuntimeValidationResult => {
    const validation = useMemo((): RuntimeValidationResult => {
        const errors: ValidationError[] = [];

        if (!teiId) {
            errors.push({
                field: 'teiId',
                message: 'Missing Tracked Entity Instance ID. This should be provided by the Capture app.',
                severity: 'error',
            });
        }

        if (!orgUnitId) {
            errors.push({
                field: 'orgUnitId',
                message: 'Missing Organization Unit ID. This should be provided by the Capture app.',
                severity: 'error',
            });
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }, [teiId, orgUnitId]);

    return validation;
};
