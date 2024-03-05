import { useEffect, useState } from 'react';
import { ChartData, CategoryCodes } from '../../../types/chartDataTypes';
import { chartData } from '../../../DataSets/WhoStandardDataSets/ZScores/ChartDataZscores';

interface ChartDataForGenderProps {
    gender: string;
}

export const useChartDataForGender = ({ gender }: ChartDataForGenderProps) => {
    const [chartDataForGender, setData] = useState<ChartData>({});
    const [categoryCodesForGender, setCategoryCodes] = useState<Record<string, string>>({});

    useEffect(() => {
        const newData: ChartData = {};
        const newCategoryCodes: Record<string, string> = {};

        Object.keys(chartData).forEach((category) => {
            Object.keys(chartData[category].datasets).forEach((dataset) => {
                if (chartData[category].datasets[dataset].metadata.gender === gender) {
                    if (!newData[category]) {
                        newData[category] = { datasets: {} };
                    }
                    newData[category].datasets[dataset] = chartData[category].datasets[dataset];
                    newCategoryCodes[category] = CategoryCodes[category as keyof typeof CategoryCodes];
                }
            });
        });

        setData(newData);
        setCategoryCodes(newCategoryCodes);
    }, [gender]);

    return { chartDataForGender, categoryCodesForGender };
};
