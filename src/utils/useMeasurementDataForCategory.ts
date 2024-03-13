import { CategoryCodes, CategoryLabels } from '../types/chartDataTypes';

interface MeasurementDataEntry {
    dataValues: {
        [key: string]: number | string;
    };
}

export const useMeasurementDataForcategory = (
    measurementData: MeasurementDataEntry[],
    categoryLabel: typeof CategoryCodes,
) => {
    const datasetMappings = {
        [CategoryLabels.hcfa]: 'headCircumference',
        [CategoryLabels.lhfa]: 'height',
        [CategoryLabels.wfa]: 'weight',
        [CategoryLabels.wflh]: 'weight',
    };

    const fieldName = datasetMappings[categoryLabel];
    if (!fieldName) { return []; }

    const measurementDataValues = measurementData.map((entry: any) => parseFloat(entry.dataValues[fieldName]));

    return [
        {
            data: measurementDataValues,
            borderWidth: 1.5,
            borderColor: 'rgba(43,102,147,255)',
            pointRadius: 5,
            pointBackgroundColor: 'rgba(43,102,147,255)',
            fill: false,
            borderDash: [5, 5],
        },
    ];
};
