interface MeasurementDataEntry {
    eventDate: string | Date;
    dataValues: {
        [key: string]: number | string;
    };
}

export const useMeasurementDataForcategory = (
    measurementData: MeasurementDataEntry[],
    fieldName: string,
    category: string,
) => {
    const measurementDataValues: { x: Date | number | string; y: number; eventDate?: Date }[] = [];

    measurementData.forEach((entry: MeasurementDataEntry) => {
        let xValue: Date | number | string;
        let yValue: number;
        let eventDateValue: Date | undefined;

        if (category === 'wflh_b' || category === 'wflh_g') {
            xValue = parseFloat(entry.dataValues.height as string);
            yValue = parseFloat(entry.dataValues.weight as string);
            eventDateValue = new Date(entry.eventDate);

            return measurementDataValues.push({ x: xValue, y: yValue, eventDate: eventDateValue });
        }
        xValue = (entry.eventDate as Date);
        yValue = parseFloat(entry.dataValues[fieldName] as string);
        return measurementDataValues.push({ x: xValue, y: yValue });
    });

    return [
        {
            id: 'measurementData',
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
