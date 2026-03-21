import { useMemo } from 'react';
import { ValidationError } from './useConfigValidation';

export interface RuntimeValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

export const useRuntimeValidation = (
    teiId: string | undefined,
    orgUnitId: string | undefined,
    isErrorTei?: boolean,
): RuntimeValidationResult => {
    const validation = useMemo((): RuntimeValidationResult => {
        const errors: ValidationError[] = [];

        if (!teiId) {
            errors.push({
                field: 'teiId',
                message: 'Missing Tracked Entity Instance ID. This should be provided by the Capture app.',
            });
        }

        if (!orgUnitId) {
            errors.push({
                field: 'orgUnitId',
                message: 'Missing Organisation Unit ID. This should be provided by the Capture app.',
            });
        }

        if (isErrorTei) {
            errors.push({
                field: 'trackedEntity',
                message:
                    'Could not load tracked entity data for this profile. Check access to the program and that the ' +
                    'tracked entity exists.',
            });
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    }, [teiId, orgUnitId, isErrorTei]);

    return validation;
};
