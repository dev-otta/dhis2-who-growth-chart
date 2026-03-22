import { useMemo } from 'react';
import { DefaultIndicatorPrefixes, isDefaultIndicatorPrefix } from '../../../types/chartDataTypes';
import { ChartConfig } from './useChartConfig';
import type { ProgramTrackedEntityAttributeIds } from './useProgramTrackedEntityAttributes';

const DHIS2_UID_REGEX = /^[a-zA-Z][a-zA-Z0-9]{10}$/;

const isValidUid = (value: string | undefined): boolean =>
    typeof value === 'string' && DHIS2_UID_REGEX.test(value);

const invalidUidMessage = (value: string): string =>
    `"${value}" is not a valid DHIS2 UID (must be 11 alphanumeric characters starting with a letter).`;

const programTrackedEntityAttributeMismatchMessage = (
    attributeKey: 'dateOfBirth' | 'gender' | 'firstName' | 'lastName',
    configuredId: string,
): string =>
    `The configured ID "${configuredId}" for metadata.attributes.${attributeKey} does not match any tracked entity attribute on this program.`;

export interface ValidationError {
    field: string;
    message: string;
}

export interface ConfigValidationResult {
    isValid: boolean;
    errors: ValidationError[];
}

interface ConfigValidationContext {
    /** From program `programTrackedEntityAttributes` — used to validate optional first/last name attribute IDs. */
    programTrackedEntityAttributeIds?: ProgramTrackedEntityAttributeIds;
    isLoadingProgramTrackedEntityAttributes?: boolean;
    programStageDataElementIds?: string[];
    isLoadingProgramStage?: boolean;
    genderOptionCodes?: string[];
    isLoadingGenderOptions?: boolean;
    programStageIdsByProgramId?: Record<string, string[]>;
    programIdsFailedToLoad?: string[];
    isLoadingProgramMappings?: boolean;
    parentProgramId?: string;
}

export const useConfigValidation = (
    chartConfig: ChartConfig | undefined,
    isLoading: boolean,
    isError: boolean,
    context: ConfigValidationContext = {},
): ConfigValidationResult => {
    const {
        programTrackedEntityAttributeIds,
        isLoadingProgramTrackedEntityAttributes = false,
        programStageDataElementIds,
        isLoadingProgramStage = false,
        genderOptionCodes,
        isLoadingGenderOptions = false,
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoadingProgramMappings = false,
        parentProgramId,
    } = context;

    const validation = useMemo((): ConfigValidationResult => {
        const errors: ValidationError[] = [];

        if (isLoading) {
            return {
                isValid: false,
                errors: [],
            };
        }

        if (isError) {
            return {
                isValid: false,
                errors: [{
                    field: 'Configuration',
                    message: 'Unable to load growth chart settings. Please check your configuration in the Datastore Management app.',
                }],
            };
        }

        if (!chartConfig) {
            return {
                isValid: false,
                errors: [{
                    field: 'Configuration',
                    message: 'Growth chart configuration not found. Please set up the configuration in the Datastore Management app.',
                }],
            };
        }

        if (!chartConfig.metadata) {
            errors.push({
                field: 'metadata',
                message: 'Missing "metadata" section in configuration.',
            });
        } else {
            if (!chartConfig.metadata.attributes) {
                errors.push({
                    field: 'metadata.attributes',
                    message: 'Missing "attributes" section in metadata.',
                });
            } else {
                const attrs = chartConfig.metadata.attributes;

                if (!attrs.dateOfBirth) {
                    errors.push({
                        field: 'metadata.attributes.dateOfBirth',
                        message: 'Date of birth attribute is not configured. This is required for age calculations.',
                    });
                } else if (!isValidUid(attrs.dateOfBirth)) {
                    errors.push({
                        field: 'metadata.attributes.dateOfBirth',
                        message: invalidUidMessage(attrs.dateOfBirth),
                    });
                }

                if (!attrs.gender) {
                    errors.push({
                        field: 'metadata.attributes.gender',
                        message: 'Gender attribute is not configured. This is required for gender-specific growth charts.',
                    });
                } else if (!isValidUid(attrs.gender)) {
                    errors.push({
                        field: 'metadata.attributes.gender',
                        message: invalidUidMessage(attrs.gender),
                    });
                }

                if (attrs.firstName && !isValidUid(attrs.firstName)) {
                    errors.push({
                        field: 'metadata.attributes.firstName',
                        message: invalidUidMessage(attrs.firstName),
                    });
                }

                if (attrs.lastName && !isValidUid(attrs.lastName)) {
                    errors.push({
                        field: 'metadata.attributes.lastName',
                        message: invalidUidMessage(attrs.lastName),
                    });
                }

                const femaleOptionCode =
                    attrs.femaleOptionCode != null && attrs.femaleOptionCode !== ''
                        ? String(attrs.femaleOptionCode).trim()
                        : '';
                const maleOptionCode =
                    attrs.maleOptionCode != null && attrs.maleOptionCode !== ''
                        ? String(attrs.maleOptionCode).trim()
                        : '';

                if (!femaleOptionCode) {
                    errors.push({
                        field: 'metadata.attributes.femaleOptionCode',
                        message:
                            'femaleOptionCode is required. Set it to the option code for the female value ' +
                            '(see the gender attribute option set in Maintenance).',
                    });
                }

                if (!maleOptionCode) {
                    errors.push({
                        field: 'metadata.attributes.maleOptionCode',
                        message:
                            'maleOptionCode is required. Set it to the option code for the male value ' +
                            '(see the gender attribute option set in Maintenance).',
                    });
                }

                if (femaleOptionCode && maleOptionCode && femaleOptionCode === maleOptionCode) {
                    errors.push({
                        field: 'metadata.attributes.maleOptionCode',
                        message: 'maleOptionCode and femaleOptionCode must be different values.',
                    });
                }

                if (
                    !isLoadingGenderOptions &&
                    genderOptionCodes &&
                    genderOptionCodes.length > 0 &&
                    femaleOptionCode &&
                    maleOptionCode
                ) {
                    const allowed = new Set(genderOptionCodes);
                    if (!allowed.has(femaleOptionCode)) {
                        errors.push({
                            field: 'metadata.attributes.femaleOptionCode',
                            message:
                                `femaleOptionCode "${femaleOptionCode}" is not a code on the configured gender attribute option set.`,
                        });
                    }
                    if (!allowed.has(maleOptionCode)) {
                        errors.push({
                            field: 'metadata.attributes.maleOptionCode',
                            message:
                                `maleOptionCode "${maleOptionCode}" is not a code on the configured gender attribute option set.`,
                        });
                    }
                }
            }

            if (!chartConfig.metadata.dataElements) {
                errors.push({
                    field: 'metadata.dataElements',
                    message: 'Missing "dataElements" section in metadata.',
                });
            } else {
                const elements = chartConfig.metadata.dataElements;

                if (!elements.weight) {
                    errors.push({
                        field: 'metadata.dataElements.weight',
                        message: 'Missing "weight" data element ID.',
                    });
                } else if (!isValidUid(elements.weight)) {
                    errors.push({
                        field: 'metadata.dataElements.weight',
                        message: invalidUidMessage(elements.weight),
                    });
                }

                if (!elements.height) {
                    errors.push({
                        field: 'metadata.dataElements.height',
                        message: 'Missing "height" data element ID. Height-based charts will not work.',
                    });
                } else if (!isValidUid(elements.height)) {
                    errors.push({
                        field: 'metadata.dataElements.height',
                        message: invalidUidMessage(elements.height),
                    });
                }

                if (!elements.headCircumference) {
                    errors.push({
                        field: 'metadata.dataElements.headCircumference',
                        message: 'Missing "headCircumference" data element ID. Head circumference charts will not work.',
                    });
                } else if (!isValidUid(elements.headCircumference)) {
                    errors.push({
                        field: 'metadata.dataElements.headCircumference',
                        message: invalidUidMessage(elements.headCircumference),
                    });
                }
            }
        }

        if (!chartConfig.metadata.programStageForGrowthChart) {
            errors.push({
                field: 'metadata.programStageForGrowthChart',
                message: 'Missing "programStageForGrowthChart" object in metadata configuration.',
            });
        } else if (typeof chartConfig.metadata.programStageForGrowthChart !== 'object' || 
                   Array.isArray(chartConfig.metadata.programStageForGrowthChart)) {
            errors.push({
                field: 'metadata.programStageForGrowthChart',
                message: '"programStageForGrowthChart" must be an object mapping programId to programStageId. ' +
                    'Each program can only have one stage configured for growth chart data.',
            });
        } else if (Object.keys(chartConfig.metadata.programStageForGrowthChart).length === 0) {
            errors.push({
                field: 'metadata.programStageForGrowthChart',
                message: '"programStageForGrowthChart" object is empty. At least one program stage mapping is required.',
            });
        } else {
            Object.entries(chartConfig.metadata.programStageForGrowthChart).forEach(([programId, programStageId]) => {
                if (!isValidUid(programId)) {
                    errors.push({
                        field: 'metadata.programStageForGrowthChart',
                        message: invalidUidMessage(programId),
                    });
                }

                if (!isValidUid(programStageId)) {
                    errors.push({
                        field: `metadata.programStageForGrowthChart.${programId}`,
                        message: invalidUidMessage(programStageId),
                    });
                }
            });
        }

        if (
            parentProgramId &&
            isValidUid(parentProgramId) &&
            chartConfig.metadata?.programStageForGrowthChart &&
            typeof chartConfig.metadata.programStageForGrowthChart === 'object' &&
            !Array.isArray(chartConfig.metadata.programStageForGrowthChart) &&
            Object.keys(chartConfig.metadata.programStageForGrowthChart).length > 0
        ) {
            const mapping = chartConfig.metadata.programStageForGrowthChart;
            if (!Object.prototype.hasOwnProperty.call(mapping, parentProgramId)) {
                errors.push({
                    field: 'metadata.programStageForGrowthChart',
                    message:
                        `The current Capture program (${parentProgramId}) must be configured in programStageForGrowthChart. ` +
                        'Add this program ID as a key and map it to the program stage used for growth measurements.',
                });
            }
        }

        if (
            !isLoadingProgramMappings &&
            chartConfig.metadata?.programStageForGrowthChart &&
            typeof chartConfig.metadata.programStageForGrowthChart === 'object' &&
            !Array.isArray(chartConfig.metadata.programStageForGrowthChart)
        ) {
            const mapping = chartConfig.metadata.programStageForGrowthChart;
            const entries: [string, unknown][] =
                parentProgramId && isValidUid(parentProgramId)
                    ? Object.prototype.hasOwnProperty.call(mapping, parentProgramId)
                        ? [[parentProgramId, mapping[parentProgramId]]]
                        : []
                    : Object.entries(mapping);

            entries.forEach(([programId, programStageId]) => {
                if (!isValidUid(programId) || !isValidUid(String(programStageId))) {
                    return;
                }
                if (programIdsFailedToLoad?.includes(programId)) {
                    errors.push({
                        field: `metadata.programStageForGrowthChart.${programId}`,
                        message:
                            `Program "${programId}" could not be loaded. ` +
                            'Check that the program ID exists and you have access.',
                    });
                    return;
                }
                const allowedStages = programStageIdsByProgramId?.[programId];
                if (
                    allowedStages !== undefined &&
                    !allowedStages.includes(String(programStageId))
                ) {
                    errors.push({
                        field: `metadata.programStageForGrowthChart.${programId}`,
                        message:
                            `Program stage "${programStageId}" is not part of program "${programId}". ` +
                            'Use a program stage ID that belongs to that program.',
                    });
                }
            });
        }

        if (!chartConfig.settings) {
            errors.push({
                field: 'settings',
                message: 'Missing "settings" section in configuration.',
            });
        } else if (
            typeof chartConfig.settings.defaultIndicator === 'string' &&
            chartConfig.settings.defaultIndicator.length > 0 &&
            !isDefaultIndicatorPrefix(chartConfig.settings.defaultIndicator)
        ) {
            errors.push({
                field: 'settings.defaultIndicator',
                message:
                    `Invalid defaultIndicator "${chartConfig.settings.defaultIndicator}". ` +
                    `Use one of: ${DefaultIndicatorPrefixes.join(', ')}.`,
            });
        }

        if (
            !isLoadingProgramTrackedEntityAttributes &&
            programTrackedEntityAttributeIds &&
            chartConfig.metadata?.attributes
        ) {
            const observedProgramTrackedEntityAttributeIds = new Set(programTrackedEntityAttributeIds);
            (['dateOfBirth', 'gender', 'firstName', 'lastName'] as const).forEach((attributeKey) => {
                const configuredId = chartConfig.metadata.attributes[attributeKey];
                if (!configuredId || !isValidUid(configuredId)) {
                    return;
                }
                if (!observedProgramTrackedEntityAttributeIds.has(configuredId)) {
                    errors.push({
                        field: `metadata.attributes.${attributeKey}`,
                        message: programTrackedEntityAttributeMismatchMessage(
                            attributeKey,
                            configuredId,
                        ),
                    });
                }
            });
        }

        if (!isLoadingProgramStage && programStageDataElementIds && programStageDataElementIds.length > 0 && chartConfig.metadata?.dataElements) {
            const observedDataElementIds = new Set(programStageDataElementIds);
            (['weight', 'height', 'headCircumference'] as const).forEach((dataElementKey) => {
                const configuredId = chartConfig.metadata.dataElements[dataElementKey];
                if (!configuredId || !isValidUid(configuredId)) {
                    return;
                }
                if (!observedDataElementIds.has(configuredId)) {
                    errors.push({
                        field: `metadata.dataElements.${dataElementKey}`,
                        message: `Configured ID "${configuredId}" does not match any data element on the program stage.`,
                    });
                }
            });
        }

        const isValid = errors.length === 0;

        return {
            isValid,
            errors,
        };
    }, [
        chartConfig,
        isLoading,
        isError,
        programTrackedEntityAttributeIds,
        isLoadingProgramTrackedEntityAttributes,
        programStageDataElementIds,
        isLoadingProgramStage,
        genderOptionCodes,
        isLoadingGenderOptions,
        programStageIdsByProgramId,
        programIdsFailedToLoad,
        isLoadingProgramMappings,
        parentProgramId,
    ]);

    return validation;
};
