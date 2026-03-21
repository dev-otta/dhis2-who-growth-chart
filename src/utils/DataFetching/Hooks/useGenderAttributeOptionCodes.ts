import { useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useDataEngine } from '@dhis2/app-runtime';

const DHIS2_UID_REGEX = /^[a-zA-Z][a-zA-Z0-9]{10}$/;

interface UseGenderAttributeOptionCodesReturn {
    genderOptionCodes: string[];
    isLoading: boolean;
}

export const useGenderAttributeOptionCodes = (
    genderAttributeId: string | undefined,
): UseGenderAttributeOptionCodesReturn => {
    const dataEngine = useDataEngine();

    const { data, isLoading } = useQuery({
        queryKey: ['genderAttributeOptionCodes', genderAttributeId],
        queryFn: (): Promise<unknown> =>
            dataEngine.query({
                trackedEntityAttribute: {
                    resource: `trackedEntityAttributes/${genderAttributeId}`,
                    params: {
                        fields: 'optionSet[options[code]]',
                    },
                },
            }) as Promise<unknown>,
        enabled:
            typeof genderAttributeId === 'string' &&
            DHIS2_UID_REGEX.test(genderAttributeId),
        staleTime: 5000,
    });

    const genderOptionCodes = useMemo(() => {
        const response = data as
            | {
                  trackedEntityAttribute?: {
                      optionSet?: { options?: Array<{ code?: string }> };
                  };
              }
            | undefined;
        const options = response?.trackedEntityAttribute?.optionSet?.options;
        if (!Array.isArray(options)) {
            return [];
        }
        return options
            .map((o) => o?.code)
            .filter((c): c is string => typeof c === 'string' && c.length > 0);
    }, [data]);

    return {
        genderOptionCodes,
        isLoading: Boolean(genderAttributeId && DHIS2_UID_REGEX.test(genderAttributeId) && isLoading),
    };
};
