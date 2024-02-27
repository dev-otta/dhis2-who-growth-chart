import i18n from '@dhis2/d2-i18n';

export interface AnnotationLabel {
    display: boolean;
    content?: () => string;
    position?: 'top' | 'bottom' | 'center' | 'start' | 'end';
    yAdjust?: number;
}

interface Annotation {
    display: boolean;
    type: 'line';
    scaleID?: string;
    value?: number;
    borderWidth?: number;
    label?: AnnotationLabel;
}

export const GrowthChartAnnotations = (xAxisValues: number[]) => {
    const annotations: Annotation[] = [];

    xAxisValues.forEach(
        (label, index) => {
            if (label % 12 === 0 && label !== 0) {
                annotations.push({
                    display: true,
                    type: 'line',
                    scaleID: 'x',
                    borderWidth: 2,
                    value: index,
                    label: {
                        display: true,
                        content: () => {
                            const value = label / 12;
                            if (value === 1) return `${value} ${i18n.t('Year')}`;
                            return `${value} ${i18n.t('Years')}`;
                        },
                        position: 'end',
                        yAdjust: 10,
                    },

                });
            }
        },
    );
    return annotations;
};
