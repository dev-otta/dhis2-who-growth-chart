import { useCalculateDecimalDate } from './useCalculateDecimalDate';

export interface MeasurementDataEntry {
    eventDate: string | Date;
    dataValues: {
        [key: string]: number | string;
    };
}

export const useMeasurementDataChart = (
    measurementData: MeasurementDataEntry[],
    fieldName: string,
    category: string,
    dataset: string | number,
    dateOfBirth: Date,
) => {
    const measurementDataValues: { x: Date | number | string; y: number; eventDate?: Date }[] = [];

    if (dataset === '0 to 13 weeks' || dataset === '0 to 2 years' || dataset === '0 to 5 years') {
        measurementData?.forEach((entry: MeasurementDataEntry) => {
            let xValue: Date | number | string;
            let yValue: number;

            if (category === 'wflh_b' || category === 'wflh_g') {
                xValue = parseFloat(entry.dataValues.height as string);
                yValue = parseFloat(entry.dataValues.weight as string);
            } else {
                let dateString: string;
                if (typeof entry.eventDate === 'string') {
                    dateString = entry.eventDate;
                } else {
                    dateString = entry.eventDate.toISOString();
                }
                const xValueDecimalDate: string = useCalculateDecimalDate(dateString, dataset, dateOfBirth);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }
            const eventDateValue = new Date(entry.eventDate);
            return measurementDataValues.push({
                x: xValue,
                y: yValue,
                eventDate: eventDateValue,
            });
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
                let dateString: string;
                if (typeof entry.eventDate === 'string') {
                    dateString = entry.eventDate;
                } else {
                    dateString = entry.eventDate.toISOString();
                }
                const xValueDecimalDate: string = useCalculateDecimalDate(dateString, dataset, dateOfBirth);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }
            const eventDateValue = new Date(entry.eventDate);
            return measurementDataValues.push({
                x: xValue,
                y: yValue,
                eventDate: eventDateValue,
            });
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
