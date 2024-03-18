import i18n from '@dhis2/d2-i18n';
import { timeUnitCodes } from '../../types/chartDataTypes';

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

const contentText = (value: number, xAxisLabel: string) => {
    const { singular, plural } = timeUnitData[xAxisLabel];
    return `${value} ${value === 1 ? singular : plural}`;
};

export const useGrowthChartAnnotations = (
    ZscoreLines: any[],
    datasetMetadata: any,
): AnnotationLabelType[] => {
    const timeUnitConfig = timeUnitData[datasetMetadata.xAxisLabel];
    if (timeUnitConfig) {
        const xValues = ZscoreLines[0]?.data.map((entry: any) => entry.x) || [];

        const { divisor } = timeUnitConfig;

        const annotations = xValues.filter((label: number) => label % divisor === 0)
            .map((label: number) => ({
                display: true,
                type: 'line',
                scaleID: 'x',
                borderWidth: 1.2,
                value: label,
                label: {
                    display: true,
                    content: () => {
                        const value = label / divisor;
                        return contentText(value, datasetMetadata.xAxisLabel);
                    },
                    position: 'end',
                    yAdjust: 10,
                    font: [{ size: 13, weight: 'normal' }],
                    color: 'rgba(75, 75, 75)',
                    backgroundColor: 'rgba(237, 237, 237)',
                },
            }));
        if ((xValues.length - 1) % 12 === 0) {
            annotations.pop();
        }
        annotations.shift();
        return annotations;
    }
    return [];
};
