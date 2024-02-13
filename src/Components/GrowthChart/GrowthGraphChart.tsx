import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Chart, CategoryScale } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartOptions } from 'chart.js';


type ZScoreData = {
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
};

type PercentData = {
    Week?: number;
    Month?: number;
    Year?: number;
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
};

type GrowthChartProps<T> = {
    growthLines: ZScoreData[] | PercentData[],
    childGrowth: ({ Month: number; measurement: T } | { Year: number; measurement: T } | { Week: number; measurement: T })[],
    timePeriod: 'Week' | 'Month' | 'Year' | '',
    percentile: boolean,
    label: string
};

export const DashboardGraphChart = ({ growthLines, childGrowth, timePeriod, percentile, label }: GrowthChartProps<number>): JSX.Element => {
    Chart.register(CategoryScale);

    let labels: string[] = [];
    let datasets: { label: string; data: number[]; borderColor: string }[] = [];

    if (timePeriod === 'Week') labels = growthLines.map((entry) => `${i18n.t('Week')} ${entry.Week}`);
    if (timePeriod === 'Month') labels = growthLines.map((entry) => `${i18n.t('Month')} ${entry.Month}`);
    if (timePeriod === 'Year') labels = growthLines.map((entry) => `${i18n.t('Year')} ${entry.Year}`);
    if (timePeriod === '') labels = growthLines.map((_entry, index) => `${i18n.t('Data point')} ${index + 1}`);

    // const zScoreColors: Record<string, string> = {
    //     'SD3neg': 'black',
    //     'SD2neg': 'red',
    //     'SD1neg': 'orange',
    //     'SD0': 'green',
    //     'SD1': 'orange',
    //     'SD2': 'red',
    //     'SD3': 'black',
    // };

    if (!percentile) {

        // The commented code is dynamic, but i think the hardcoded one is better because there should just be 7 z-scores
        // const zScoreLabels: string[] = Object.keys(growthLines[0]).filter(prop => prop.startsWith('SD'));

        // datasets = zScoreLabels.map(label => {
        //     let zScoreNumber = label.replace('SD', '');

        //     if (zScoreNumber.includes('neg')) {
        //         zScoreNumber = zScoreNumber.replace(/^/, '-').replace('neg', '');
        //     }
        //     console.log(label)
        //     return {
        //         label: `Z-score ${zScoreNumber}`,
        //         data: growthLines.map(entry => {console.log(entry); entry[label] || 0}),
        //         borderColor: zScoreColors[label],
        //     };


        datasets = [
            { label: 'Z-score -3', data: growthLines.map((entry: ZScoreData) => entry.SD3neg), borderColor: 'black' },
            { label: 'Z-score -2', data: growthLines.map((entry: ZScoreData) => entry.SD2neg), borderColor: 'red' },
            { label: 'Z-score -1', data: growthLines.map((entry: ZScoreData) => entry.SD1neg), borderColor: 'orange' },
            { label: 'Z-score 0', data: growthLines.map((entry: ZScoreData) => entry.SD0), borderColor: 'green' },
            { label: 'Z-score 1', data: growthLines.map((entry: ZScoreData) => entry.SD1), borderColor: 'orange' },
            { label: 'Z-score 2', data: growthLines.map((entry: ZScoreData) => entry.SD2), borderColor: 'red' },
            { label: 'Z-score 3', data: growthLines.map((entry: ZScoreData) => entry.SD3), borderColor: 'black' }
        ];

        };



    if (percentile) {
        // This should maybe just be a map of the percentiles, but then we need to know the colors they should have
        datasets = [
            { label: '3%', data: growthLines.map((entry: PercentData) => entry.P3), borderColor: 'red' },
            { label: '15%', data: growthLines.map((entry: PercentData) => entry.P15), borderColor: 'orange' },
            { label: '50%', data: growthLines.map((entry: PercentData) => entry.P50), borderColor: 'green' },
            { label: '85%', data: growthLines.map((entry: PercentData) => entry.P85), borderColor: 'orange' },
            { label: '97%', data: growthLines.map((entry: PercentData) => entry.P97), borderColor: 'red' },
            // Add other percentile datasets
        ];
    }

    // Here it is possible to assume that childgrowth is just an array with numbers, then we do not need .height and it works for all the cases
    datasets.push({ label: label, data: childGrowth.map((entry) => entry.height), borderColor: 'pink' });

    const chartData = { labels, datasets };

    const chartOptions: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                grid: { color: '#edeeee' },
                border: { dash: [4, 4] },
            },
            y: {
                grid: { color: '#edeeee' },
                border: { dash: [4, 4] },
            },
        },
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            // annotation: {
            //     annotations: [
            //         {
            //             type: 'line',
            //             scaleID: 'x',
            //             value: xValues.indexOf(previousYear),
            //             borderColor: '#C0C0C0',
            //             borderWidth: 1,
            //             borderDash: [4, 4],
            //         },
            //     ],
            // },
            legend: {
                display: false,
                labels: { font: { weight: 'bold' } },
            },
            tooltip: {
                enabled: true,
                mode: 'index',
                axis: 'x',
                intersect: false,
                position: 'nearest',
                titleAlign: 'center',
                titleFont: { size: 16, weight: 'bold' },
                titleColor: '#2c6693',
                backgroundColor: 'white',
                bodyFont: { size: 13 },
                bodyColor: 'black',
                borderColor: 'black',
                borderWidth: 1,
                padding: 18,
                caretPadding: 6,
                boxPadding: 6,
                usePointStyle: true
            },

        },
    };


    return (
        <div style={{ width: '1200px', height: '1000px' }}>
            <AutoSizer>
                {({ height, width }) => (
                    <div style={{ height, width }}>
                        <Line data={chartData} options={chartOptions} />
                    </div>
                )}
            </AutoSizer>
        </div>
    );
};

