import { wfaF05Z } from './WhoStandardDataSets';

export const chartData = {
    'Weight-for-age GIRLS': {
        datasets: { Girls0to5Years: wfaF05Z },
        metadata: {
            Girls0to5Years: {
                label: 'Girls 0 to 5 years', yaxis: 'Weight (kg)', unit: 'Months', range: { start: 0, end: 60 },
            },
        },
    },
};
