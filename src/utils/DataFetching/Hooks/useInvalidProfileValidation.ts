import { useMemo } from 'react';
import i18n from '@dhis2/d2-i18n';
import type { MappedEntityValues } from '../../../types/mappedEntityValues';

/** One issue with profile fields needed for the chart (same shape as config validation messages). */
export interface InvalidProfileWarning {
    field: string;
    message: string;
}

export interface InvalidProfileValidationResult {
    /** True when date of birth and gender are present for chart use. */
    isValid: boolean;
    warnings: InvalidProfileWarning[];
}

export const useInvalidProfileValidation = (
    trackedEntity: MappedEntityValues,
): InvalidProfileValidationResult => {
    return useMemo((): InvalidProfileValidationResult => {
        const warnings: InvalidProfileWarning[] = [];

        const dateOfBirth = trackedEntity.dateOfBirth;
        if (dateOfBirth === undefined || dateOfBirth === '') {
            warnings.push({
                field: i18n.t('Date of birth'),
                message: i18n.t('Missing. Age-based axes and categories may be wrong.'),
            });
        }

        if (trackedEntity.gender === undefined || trackedEntity.gender === '') {
            warnings.push({
                field: i18n.t('Gender'),
                message: i18n.t('Missing from the profile. Reference curves default until gender is set.'),
            });
        }

        return {
            isValid: warnings.length === 0,
            warnings,
        };
    }, [trackedEntity]);
};
