import i18n from '@dhis2/d2-i18n';

export interface AnnotationLabelType {
    display: boolean;
    content?: () => string;
    position?: 'top' | 'bottom' | 'center' | 'start' | 'end';
    yAdjust?: number;
}

export const GrowthChartAnnotations = (xAxisValues: number[], timeUnit: string) => {
    if (timeUnit === 'Months') {
        return xAxisValues
            .filter((label) => label % 12 === 0 && label !== 0)
            .map((label) => ({
                display: true,
                type: 'line',
                scaleID: 'x',
                borderWidth: 1.2,
                value: label,
                label: {
                    display: true,
                    content: () => {
                        const value = label / 12;
                        return `${value} ${value === 1 ? i18n.t('Year') : i18n.t('Years')}`;
                    },
                    position: 'end',
                    yAdjust: 10,
                },

            }));
    }
    return [];
};
