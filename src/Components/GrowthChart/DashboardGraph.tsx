import React from 'react';
import { DashboardGraphChart } from './DashboardGraphChart';
import zscore0to14Weeks from './GrowthStandardsData/HeadCircumferenceForAgeBoys0to13weeks.json'
import percent24to60Months from './GrowthStandardsData/HeightForAgeBoys2to5years.json'

export const Growthgraph = (): JSX.Element => {
    return (
        <DashboardGraphChart data={percent24to60Months} />
    );
};
