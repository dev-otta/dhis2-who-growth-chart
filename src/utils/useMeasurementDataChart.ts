import { useCalculateDecimalDate } from './useCalculateDecimalDate';

interface MeasurementDataEntry {
    eventDate: string | Date;
    dataValues: {
        [key: string]: number | string;
    };
}

export const useMeasurementDataChart = (
    measurementData: MeasurementDataEntry[],
    fieldName: string,
    category: string,
    dataset: string,
) => {
    const measurementDataValues: { x: Date | number | string; y: number; eventDate?: Date }[] = [];

    const measurementDates = measurementData.map((entry) => entry.eventDate);

    if (dataset === '0 to 13 weeks') {
        measurementData.forEach((entry: MeasurementDataEntry) => {
            let xValue: Date | number | string;
            let yValue: number;

            if (category === 'wflh_b' || category === 'wflh_g') {
                xValue = parseFloat(entry.dataValues.height as string);
                yValue = parseFloat(entry.dataValues.weight as string);
            } else {
                const xValueDecimalDate: string = useCalculateDecimalDate(entry.eventDate, dataset);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }
            const eventDateValue = new Date(entry.eventDate);
            return measurementDataValues.push({ x: xValue, y: yValue, eventDate: eventDateValue });
        });
    }

    if (dataset === '0 to 2 years' || dataset === '0 to 5 years') {
        measurementData.forEach((entry: MeasurementDataEntry) => {
            let xValue: Date | number | string;
            let yValue: number;

            if (category === 'wflh_b' || category === 'wflh_g') {
                xValue = parseFloat(entry.dataValues.height as string);
                yValue = parseFloat(entry.dataValues.weight as string);
            } else {
                const xValueDecimalDate: string = useCalculateDecimalDate(entry.eventDate, dataset);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }
            const eventDateValue = new Date(entry.eventDate);
            return measurementDataValues.push({ x: xValue, y: yValue, eventDate: eventDateValue });
        });
    }

    if (dataset === '2 to 5 years') {
        measurementData = measurementData.slice(24);

        measurementData.forEach((entry: MeasurementDataEntry) => {
            let xValue: Date | number | string;
            let yValue: number;

            if (category === 'wflh_b' || category === 'wflh_g') {
                xValue = parseFloat(entry.dataValues.height as string);
                yValue = parseFloat(entry.dataValues.weight as string);
            } else {
                const xValueDecimalDate: string = useCalculateDecimalDate(entry.eventDate, dataset);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }
            const eventDateValue = new Date(entry.eventDate);
            return measurementDataValues.push({ x: xValue, y: yValue, eventDate: eventDateValue });
        });
    }

    return [
        {
            id: 'measurementData',
            data: measurementDataValues,
            borderWidth: 1.5,
            borderColor: 'rgba(43,102,147,255)',
            pointRadius: 3,
            pointBackgroundColor: 'rgba(43,102,147,255)',
            fill: false,
            borderDash: [5, 5],
        },
    ];
};
