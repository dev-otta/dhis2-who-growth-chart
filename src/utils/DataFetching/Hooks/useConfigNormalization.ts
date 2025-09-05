import { useMemo } from 'react';
import { ChartConfig, ProgramStageConfig } from './useChartConfig';

// Legacy config format (for backward compatibility)
type LegacyChartConfig = {
    metadata: {
        attributes: ChartConfig['metadata']['attributes'];
        dataElements: ChartConfig['metadata']['dataElements'];
        program: {
            programId?: string;
            programStageId?: string;
            programStages?: ProgramStageConfig[];
        };
    };
    settings: ChartConfig['settings'];
    programStages?: ProgramStageConfig[];
};

export const useConfigNormalization = (rawConfig: any): ChartConfig | undefined => {
    const normalizedConfig = useMemo((): ChartConfig | undefined => {
        if (!rawConfig) return undefined;

        // If it's already in the correct format
        if (rawConfig.programStages && Array.isArray(rawConfig.programStages)) {
            return rawConfig as ChartConfig;
        }

        // Handle programStages inside metadata
        if (rawConfig.metadata?.programStages && Array.isArray(rawConfig.metadata.programStages)) {
            const normalizedConfig: ChartConfig = {
                metadata: {
                    attributes: rawConfig.metadata.attributes,
                    dataElements: rawConfig.metadata.dataElements,
                },
                programStages: rawConfig.metadata.programStages,
                settings: rawConfig.settings,
            };
            return normalizedConfig;
        }

        // Check for legacy format with nested program
        if (rawConfig.metadata?.program) {
            const legacyConfig = rawConfig as LegacyChartConfig;
            
            // Handle legacy single program stage format
            if (legacyConfig.metadata.program.programId && legacyConfig.metadata.program.programStageId) {
                const normalizedConfig: ChartConfig = {
                    metadata: legacyConfig.metadata,
                    programStages: [{
                        programId: legacyConfig.metadata.program.programId,
                        programStageId: legacyConfig.metadata.program.programStageId,
                    }],
                    settings: legacyConfig.settings,
                };
                return normalizedConfig;
            }

            // Handle legacy nested programStages format
            if (legacyConfig.metadata.program.programStages && Array.isArray(legacyConfig.metadata.program.programStages)) {
                const normalizedConfig: ChartConfig = {
                    metadata: {
                        attributes: legacyConfig.metadata.attributes,
                        dataElements: legacyConfig.metadata.dataElements,
                    },
                    programStages: legacyConfig.metadata.program.programStages,
                    settings: legacyConfig.settings,
                };
                return normalizedConfig;
            }
        }

        return undefined;
    }, [rawConfig]);

    return normalizedConfig;
};
