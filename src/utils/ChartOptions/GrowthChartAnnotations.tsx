import { timeUnitData, TimeUnitCodes } from '../../types/chartDataTypes';

export interface AnnotationLabelType {
    display: boolean;
    content?: (value: number) => string;
    position?: 'top' | 'bottom' | 'center' | 'start' | 'end';
    yAdjust?: number;
}
export const GrowthChartAnnotations = (
    ZscoreLines: any[],
    datasetMetadata: any,
): AnnotationLabelType[] => {
    let timeUnitConfig = {
        singular: '',
        plural: '',
        divisor: 0,
    };

    if (datasetMetadata.xAxisLabel === TimeUnitCodes.weeks) {
        timeUnitConfig = timeUnitData.Months;
    }

    if (datasetMetadata.xAxisLabel === TimeUnitCodes.months) {
        timeUnitConfig = timeUnitData.Years;
    }

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
                        return `${value} ${value === 1 ? timeUnitConfig.singular : timeUnitConfig.plural}`;
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
