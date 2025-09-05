import { useMemo } from 'react';
import { ChartConfig } from './useChartConfig';

export interface ValidationError {
    field: string;
    message: string;
    severity: 'error' | 'warning';
}

export interface ConfigValidationResult {
    isValid: boolean;
    errors: ValidationError[];
    warnings: ValidationError[];
}

export const useConfigValidation = (
    chartConfig: ChartConfig | undefined,
    isLoading: boolean,
    isError: boolean,
): ConfigValidationResult => {
    const validation = useMemo((): ConfigValidationResult => {
        const errors: ValidationError[] = [];
        const warnings: ValidationError[] = [];

        // If still loading, return loading state
        if (isLoading) {
            return {
                isValid: false,
                errors: [],
                warnings: [{ field: 'config', message: 'Configuration is loading...', severity: 'warning' }],
            };
        }

        // If error loading config
        if (isError) {
            return {
                isValid: false,
                errors: [{ 
                    field: 'Configuration', 
                    message: 'Unable to load growth chart settings. Please check your configuration in the Datastore Management app.', 
                    severity: 'error' 
                }],
                warnings: [],
            };
        }

        // If no config loaded
        if (!chartConfig) {
            return {
                isValid: false,
                errors: [{ 
                    field: 'Configuration', 
                    message: 'Growth chart configuration not found. Please set up the configuration in the Datastore Management app.', 
                    severity: 'error' 
                }],
                warnings: [],
            };
        }

        // Validate metadata structure
        if (!chartConfig.metadata) {
            errors.push({ 
                field: 'metadata', 
                message: 'Missing "metadata" section in configuration.', 
                severity: 'error' 
            });
        } else {
            // Validate attributes
            if (!chartConfig.metadata.attributes) {
                errors.push({ 
                    field: 'metadata.attributes', 
                    message: 'Missing "attributes" section in metadata.', 
                    severity: 'error' 
                });
            } else {
                const attrs = chartConfig.metadata.attributes;
                
                if (!attrs.dateOfBirth) {
                    errors.push({ 
                        field: 'Date of Birth', 
                        message: 'Date of birth attribute is not configured. This is required for age calculations.', 
                        severity: 'error' 
                    });
                }
                
                if (!attrs.gender) {
                    errors.push({ 
                        field: 'Gender', 
                        message: 'Gender attribute is not configured. This is required for gender-specific growth charts.', 
                        severity: 'error' 
                    });
                }
                
                if (!attrs.firstName) {
                    warnings.push({ 
                        field: 'First Name', 
                        message: 'First name attribute is not configured. Chart printing will show limited information.', 
                        severity: 'warning' 
                    });
                }
                
                if (!attrs.lastName) {
                    warnings.push({ 
                        field: 'Last Name', 
                        message: 'Last name attribute is not configured. Chart printing will show limited information.', 
                        severity: 'warning' 
                    });
                }
                
                if (!attrs.femaleOptionCode) {
                    errors.push({ 
                        field: 'Gender Options', 
                        message: 'Female gender option code is not configured. This is required to identify female patients.', 
                        severity: 'error' 
                    });
                }
                
                if (!attrs.maleOptionCode) {
                    errors.push({ 
                        field: 'Gender Options', 
                        message: 'Male gender option code is not configured. This is required to identify male patients.', 
                        severity: 'error' 
                    });
                }
            }

            // Validate data elements
            if (!chartConfig.metadata.dataElements) {
                errors.push({ 
                    field: 'metadata.dataElements', 
                    message: 'Missing "dataElements" section in metadata.', 
                    severity: 'error' 
                });
            } else {
                const elements = chartConfig.metadata.dataElements;
                
                if (!elements.weight) {
                    errors.push({ 
                        field: 'metadata.dataElements.weight', 
                        message: 'Missing "weight" data element ID.', 
                        severity: 'error' 
                    });
                }
                
                if (!elements.height) {
                    warnings.push({ 
                        field: 'metadata.dataElements.height', 
                        message: 'Missing "height" data element ID. Height-based charts will not work.', 
                        severity: 'warning' 
                    });
                }
                
                if (!elements.headCircumference) {
                    warnings.push({ 
                        field: 'metadata.dataElements.headCircumference', 
                        message: 'Missing "headCircumference" data element ID. Head circumference charts will not work.', 
                        severity: 'warning' 
                    });
                }
            }
        }

        // Validate program stages
        if (!chartConfig.programStages) {
            errors.push({ 
                field: 'programStages', 
                message: 'Missing "programStages" array in configuration.', 
                severity: 'error' 
            });
        } else if (!Array.isArray(chartConfig.programStages)) {
            errors.push({ 
                field: 'programStages', 
                message: '"programStages" must be an array.', 
                severity: 'error' 
            });
        } else if (chartConfig.programStages.length === 0) {
            errors.push({ 
                field: 'programStages', 
                message: '"programStages" array is empty. At least one program stage is required.', 
                severity: 'error' 
            });
        } else {
            // Validate each program stage
            chartConfig.programStages.forEach((stage, index) => {
                if (!stage.programId) {
                    errors.push({ 
                        field: `programStages[${index}].programId`, 
                        message: `Missing "programId" for program stage ${index + 1}.`, 
                        severity: 'error' 
                    });
                }
                
                if (!stage.programStageId) {
                    errors.push({ 
                        field: `programStages[${index}].programStageId`, 
                        message: `Missing "programStageId" for program stage ${index + 1}.`, 
                        severity: 'error' 
                    });
                }
            });
        }

        // Validate settings
        if (!chartConfig.settings) {
            errors.push({ 
                field: 'settings', 
                message: 'Missing "settings" section in configuration.', 
                severity: 'error' 
            });
        } else {
            const settings = chartConfig.settings;
            
            if (typeof settings.usePercentiles !== 'boolean') {
                warnings.push({ 
                    field: 'settings.usePercentiles', 
                    message: '"usePercentiles" should be a boolean value.', 
                    severity: 'warning' 
                });
            }
            
            if (typeof settings.customReferences !== 'boolean') {
                warnings.push({ 
                    field: 'settings.customReferences', 
                    message: '"customReferences" should be a boolean value.', 
                    severity: 'warning' 
                });
            }
            
            if (typeof settings.weightInGrams !== 'boolean') {
                warnings.push({ 
                    field: 'settings.weightInGrams', 
                    message: '"weightInGrams" should be a boolean value.', 
                    severity: 'warning' 
                });
            }
            
            if (!settings.defaultIndicator) {
                warnings.push({ 
                    field: 'settings.defaultIndicator', 
                    message: 'Missing "defaultIndicator". Will default to "wfa".', 
                    severity: 'warning' 
                });
            } else if (!['wfa', 'wfh', 'hfa', 'hcfa'].includes(settings.defaultIndicator)) {
                warnings.push({ 
                    field: 'settings.defaultIndicator', 
                    message: `"${settings.defaultIndicator}" is not a valid indicator. Valid options: wfa, wfh, hfa, hcfa.`, 
                    severity: 'warning' 
                });
            }
        }

        const isValid = errors.length === 0;

        return {
            isValid,
            errors,
            warnings,
        };
    }, [chartConfig, isLoading, isError]);

    return validation;
};
