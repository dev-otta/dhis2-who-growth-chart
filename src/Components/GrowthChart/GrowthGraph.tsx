import React from 'react';
import { DashboardGraphChart } from './GrowthGraphChart';
import zscore0to14Weeks from './GrowthStandardsData/HeadCircumferenceForAgeBoys0to13weeks.json'
import percent24to60Months from './GrowthStandardsData/HeightForAgeBoys2to5years.json'
import heightboy2to5 from './GrowthStandardsData/fakeboyheight2to5.json'
import { useIdentifyPercentileOrZScore } from "./Hooks/useIdentifyPercentileOrZScore";
import { useIdentifyTimePeriod } from './Hooks';

interface DataPoint {
    Week?: number;
    Month?: number;
    Year?: number;
    SD3neg?: number;
    SD2neg?: number;
    SD1neg?: number;
    SD0?: number;
    SD1?: number;
    SD2?: number;
    SD3?: number;
    P01?: number;
    P1?: number;
    P3?: number;
    P5?: number;
    P10?: number;
    P15?: number;
    P25?: number;
    P50?: number;
    P75?: number;
    P85?: number;
    P90?: number;
    P95?: number;
    P97?: number;
    P99?: number;
    P999?: number;
}

export const GrowthGraph = (): JSX.Element => {
    const standardGrowthData = percent24to60Months as DataPoint[];
    const childGrowth = heightboy2to5;
    const label = 'Height';

    const percentile = useIdentifyPercentileOrZScore(standardGrowthData);
    const timePeriod = useIdentifyTimePeriod(standardGrowthData);

    return (
        <DashboardGraphChart growthLines={standardGrowthData} childGrowth={childGrowth} timePeriod={timePeriod} percentile={percentile} label={label} />
    );
};
