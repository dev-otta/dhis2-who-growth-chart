import { useEffect, useState } from 'react'; // Import useState
import { useCalculateDecimalDate } from '../Calculations/useCalculateDecimalDate';
import { DataSetLabels } from '../../../types/chartDataTypes';

export interface MeasurementDataEntry {
    eventDate: string | Date;
    dataValues: {
        [key: string]: number | string;
    };
}

export const useMeasurementPlotting = (
    measurementData: MeasurementDataEntry[] | undefined,
    fieldName: string,
    category: string,
    dataset: string | number,
    dateOfBirth: Date,
    startIndex: number,
) => {
    const [measurementDataValues, setMeasurementDataValues] = useState<{ x: Date | number | string; y: number; eventDate?: Date }[]>([]);

    useEffect(() => {
        const processEntry = (entry: MeasurementDataEntry) => {
            let xValue: Date | number | string;
            let yValue: number;

            if (category === 'wflh_b' || category === 'wflh_g') {
                xValue = parseFloat(entry.dataValues.height as string);
                yValue = parseFloat(entry.dataValues.weight as string);
            } else {
                const dateString: string = typeof entry.eventDate === 'string' ? entry.eventDate : entry.eventDate.toISOString();
                const xValueDecimalDate: string = useCalculateDecimalDate(dateString, dataset, dateOfBirth);
                xValue = xValueDecimalDate;
                yValue = parseFloat(entry.dataValues[fieldName] as string);
            }

            const eventDateValue = new Date(entry.eventDate);
            setMeasurementDataValues((prevValues) => [...prevValues, {
                x: xValue,
                y: yValue,
                eventDate: eventDateValue,
            }]);
        };

        if (!measurementData) {
            return;
        }

        const validDatasets = Object.values(DataSetLabels);
        if (validDatasets.includes(dataset)) {
            measurementData.forEach(processEntry);

            if (dataset !== DataSetLabels.y_2_5) {
                setMeasurementDataValues((prevValues) => prevValues.filter((data) =>
                    typeof data.x === 'number' && data.x >= startIndex));
            }
        }
    }, [measurementData, fieldName, category, dataset, dateOfBirth, startIndex]);

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
