import React, { ReactElement } from 'react';
import { GenericLoading } from '../../../UI/GenericLoading';
import { ConfigError, CustomReferenceError } from '../../../UI/FeedbackComponents';
import { ConfigValidationError } from '../../../UI/ConfigValidationError';
import { ConfigValidationResult } from './useConfigValidation';
import { RuntimeValidationResult } from './useRuntimeValidation';

export interface UsePluginErrorHandlingParams {
    isLoading: boolean;
    isLoadingRef: boolean;
    isLoadingProgramTrackedEntityAttributes: boolean;
    isLoadingEvents: boolean;
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
        isLoadingEvents,
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

    if (isLoadingProgramTrackedEntityAttributes || isLoadingEvents) {
        return <GenericLoading />;
    }

    if (isError) {
        return <ConfigError embedded />;
    }

    if (customReferencesEnabled && isErrorRef) {
        return <CustomReferenceError embedded />;
    }

    return null;
};
