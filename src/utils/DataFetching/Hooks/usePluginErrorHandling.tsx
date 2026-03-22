import React, { ReactElement } from 'react';
import i18n from '@dhis2/d2-i18n';
import { GenericLoading } from '../../../UI/GenericLoading';
import { GenericError } from '../../../UI/GenericError';
import { ConfigError, CustomReferenceError } from '../../../UI/FeedbackComponents';
import { ConfigValidationError } from '../../../UI/ConfigValidationError';
import { ConfigValidationResult } from './useConfigValidation';
import { RuntimeValidationResult } from './useRuntimeValidation';

export interface UsePluginErrorHandlingParams {
    isLoading: boolean;
    isLoadingRef: boolean;
    isLoadingProgramTrackedEntityAttributes: boolean;
    isLoadingTeiAttributes: boolean;
    isLoadingEvents: boolean;
    isErrorTeiAttributes: boolean;
    isErrorEvents: boolean;
    configValidation: ConfigValidationResult;
    runtimeValidation: RuntimeValidationResult;
    isError: boolean;
    customReferencesEnabled: boolean | undefined;
    isErrorRef: boolean;
}

export const usePluginErrorHandling = (params: UsePluginErrorHandlingParams): ReactElement | null => {
    const {
        isLoading,
        isLoadingRef,
        isLoadingProgramTrackedEntityAttributes,
        isLoadingTeiAttributes,
        isLoadingEvents,
        isErrorTeiAttributes,
        isErrorEvents,
        configValidation,
        runtimeValidation,
        isError,
        customReferencesEnabled,
        isErrorRef,
    } = params;

    if (isLoading || isLoadingRef) {
        return <GenericLoading />;
    }

    if (!configValidation.isValid || !runtimeValidation.isValid) {
        return (
            <ConfigValidationError
                errors={[...configValidation.errors, ...runtimeValidation.errors]}
            />
        );
    }

    if (isLoadingProgramTrackedEntityAttributes || isLoadingTeiAttributes || isLoadingEvents) {
        return <GenericLoading />;
    }

    if (isErrorTeiAttributes) {
        return (
            <GenericError
                embedded
                errorMessage={i18n.t(
                    'Could not load profile data for this person. Please try again or check your access.',
                )}
            />
        );
    }

    if (isErrorEvents) {
        return (
            <GenericError
                embedded
                errorMessage={i18n.t(
                    'Could not load growth measurements for this record. Please try again or check your access.',
                )}
            />
        );
    }

    if (isError) {
        return <ConfigError embedded />;
    }

    if (customReferencesEnabled && isErrorRef) {
        return <CustomReferenceError embedded />;
    }

    return null;
};
