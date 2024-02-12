import React from 'react';
import i18n from '@dhis2/d2-i18n';
import { Chart, CategoryScale, TooltipItem } from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import AutoSizer from 'react-virtualized-auto-sizer';
import { ChartData, ChartOptions } from 'chart.js';
import heightboy2to5 from './GrowthStandardsData/HeightForAgeBoys2to5years.json'

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

interface Data {
    Week?: DataPoint[];
    Month?: DataPoint[];
    Year?: DataPoint[];
}

interface GrowthChartProps {
    data: Data;
}

const analyzeData = (data: DataPoint[]): { isWeekData: boolean; isMonthData: boolean; isYearData: boolean; isZScoreData: boolean; isPercentileData: boolean } => {
    if (data.length === 0) return { isWeekData: false, isMonthData: false, isYearData: false, isZScoreData: false, isPercentileData: false };

    console.log('data etter sjekk', data);
    const isWeekData = data.some((entry) => 'Week' in entry);
    const isMonthData = data.some((entry) => 'Month' in entry);
    const isYearData = data.some((entry) => 'Year' in entry);

    const isZScoreData = ['SD3neg', 'SD2neg', 'SD1neg', 'SD0', 'SD1', 'SD2', 'SD3'].some((prop) => prop in data[0]);
    const isPercentileData = ['P01', 'P1', 'P3', 'P5', 'P10', 'P15', 'P25', 'P50', 'P75', 'P85', 'P90', 'P95', 'P97', 'P99', 'P999'].some((prop) => prop in data[0]);

    return { isWeekData, isMonthData, isYearData, isZScoreData, isPercentileData };
};

export const DashboardGraphChart: React.FC<GrowthChartProps> = ({ data }) => {
    Chart.register(CategoryScale);

    const { isWeekData, isMonthData, isYearData, isZScoreData, isPercentileData } = analyzeData(data);

    console.log(isWeekData, isZScoreData, isPercentileData);

    let labels: number[] = [];
    let datasets: { label: string; data: number[]; borderColor: string }[] = [];

    if (isWeekData) {
        labels = data.map((entry) => `${i18n.t('Week')} ${entry.Week}`);
    } else if (isMonthData) {
        labels = data.map((entry) => `${i18n.t('Month')} ${entry.Month}`);
    } else if (isYearData) {
        labels = data.map((entry) => `${i18n.t('Year')} ${entry.Year}`);
    }

    const zScoreColors: Record<string, string> = {
        'SD3neg': 'black',
        'SD2neg': 'red',
        'SD1neg': 'orange',
        'SD0': 'green',
        'SD1': 'orange',
        'SD2': 'red',
        'SD3': 'black',
    };

    if (isZScoreData) {
        const zScoreLabels: string[] = [];
        for (const prop in data[0]) {
            if (prop.startsWith('SD')) {
                zScoreLabels.push(prop);
            }
        }

        datasets = zScoreLabels.map((label) => {
            const oldLabel = label;
            let zScoreNumber = label.replace('SD', '')
            if (zScoreNumber.includes('neg')) {
                console.log('zScoreNumber', zScoreNumber);
                zScoreNumber = zScoreNumber.replace(/^/, '-').replace('neg', '');
                console.log('zScoreNumber', zScoreNumber);
            }
            return {
                label: `Z-score ${zScoreNumber}`,
                data: data.map((entry) => entry[label] || 0),
                borderColor: zScoreColors[oldLabel],
            };
        });
    } else if (isPercentileData) {
        datasets = [
            { label: '3%', data: data.map((entry) => entry.P3), borderColor: 'red' },
            { label: '15%', data: data.map((entry) => entry.P15), borderColor: 'orange' },
            { label: '50%', data: data.map((entry) => entry.P50), borderColor: 'green' },
            { label: '85%', data: data.map((entry) => entry.P85), borderColor: 'orange' },
            { label: '97%', data: data.map((entry) => entry.P97), borderColor: 'red' },
            // Add other percentile datasets
        ];
    }

    const chartData = { labels, datasets };
    console.log(chartData);
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

