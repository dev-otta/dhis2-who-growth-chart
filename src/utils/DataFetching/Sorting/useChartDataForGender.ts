import { useEffect, useState } from 'react';
import { ChartData } from '../../../types/chartDataTypes';
import { chartData } from '../../../DataSets/WhoStandardDataSets/ChartDataZscores';

interface ChartDataForGenderProps {
    gender: string;
}

export const useChartDataForGender = ({ gender }: ChartDataForGenderProps) => {
    const [chartDataForGender, setChartDataForGender] = useState<ChartData>({});

    useEffect(() => {
        const filteredData = Object.entries(chartData).reduce(
            (acc: ChartData, [key, value]) => {
                if (value.categoryMetadata.gender === gender) {
                    acc[key] = value;
                }
                return acc;
            },
            {},
        );

        setChartDataForGender(filteredData);
    }, [gender]);

    return { chartDataForGender };
};
