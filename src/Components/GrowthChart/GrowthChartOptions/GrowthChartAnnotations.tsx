import i18n from '@dhis2/d2-i18n';
import { timeUnitCodes } from '../../../types/chartDataTypes';

interface TimeUnitData {
    singular: string;
    plural: string;
    divisor: number;
}
export interface AnnotationLabelType {
    display: boolean;
    content?: (value: number) => string;
    position?: 'top' | 'bottom' | 'center' | 'start' | 'end';
    yAdjust?: number;
}

const timeUnitData: { [key: string]: TimeUnitData } = {
    [timeUnitCodes.months]: {
        singular: i18n.t('Year'),
        plural: i18n.t('Years'),
        divisor: 12,
    },
    [timeUnitCodes.weeks]: {
        singular: i18n.t('Month'),
        plural: i18n.t('Months'),
        divisor: 4,
    },
};

const contentText = (value: number, timeUnit: string) => {
    const { singular, plural } = timeUnitData[timeUnit];
    return `${value} ${value === 1 ? singular : plural}`;
};

export const GrowthChartAnnotations = (xAxisValues: number[], timeUnit: string) => {
    const timeUnitConfig = timeUnitData[timeUnit];
    if (timeUnitConfig) {
        const firstXValue = xAxisValues[0];
        const { divisor } = timeUnitConfig;

        const annotations = xAxisValues
            .filter((label) => label % divisor === 0)
            .map((label) => ({
                display: true,
                type: 'line',
                scaleID: 'x',
                borderWidth: 1.2,
                value: label - firstXValue,
                label: {
                    display: true,
                    content: () => {
                        const value = label / divisor;
                        return contentText(value, timeUnit);
                    },
                    position: 'end',
                    yAdjust: 10,
                    font: [{ size: 13, weight: 'normal' }],
                    color: 'rgba(75, 75, 75)',
                    backgroundColor: 'rgba(237, 237, 237)',
                },
            }));
        if ((xAxisValues.length - 1) % 12 === 0) {
            annotations.pop();
        }
        annotations.shift();
        return annotations;
    }
    return [];
};
