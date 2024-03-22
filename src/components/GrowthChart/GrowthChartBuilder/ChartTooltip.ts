import i18n from '@dhis2/d2-i18n';
import { Scriptable, ScriptableTooltipContext, TooltipPositionerMap } from 'chart.js';
import { unitCodes } from '../../../types/chartDataTypes';

interface TooltipConfig {
    enabled: boolean;
    intersect: boolean;
    position: Scriptable<keyof TooltipPositionerMap, ScriptableTooltipContext<'line'>>;
    backgroundColor: string;
    bodyFont: { size: number };
    bodyColor: string;
    borderColor: string;
    borderWidth: number;
    padding: number;
    caretPadding: number;
    boxPadding: number;
    usePointStyle: boolean;
    filter: (tooltipItem: any) => boolean;
    callbacks: {
        title: () => string;
        beforeLabel: (tooltipItem: any) => string;
        label: (tooltipItem: any) => string[];
    };
}

export const ChartTooltip = (category: string, xAxisLabel: string, yAxisLabel: string): TooltipConfig => {
    let xUnit = '';
    let yUnit = '';

    if (category === 'hcfa_g' || category === 'hcfa_b') {
        yUnit = unitCodes.cm;
    }

    if (category === 'lhfa_g' || category === 'lhfa_b') {
        yUnit = unitCodes.cm;
    }

    if (category === 'wfa_g' || category === 'wfa_b') {
        yUnit = unitCodes.kg;
    }

    if (category === 'wflh_g' || category === 'wflh_b') {
        xUnit = unitCodes.cm;
        yUnit = unitCodes.kg;
    }

    if (xAxisLabel === 'Months') xUnit = xAxisLabel;
    if (xAxisLabel === 'Weeks') xUnit = xAxisLabel;

    return {
        enabled: true,
        intersect: false,
        position: 'nearest',
        backgroundColor: 'white',
        bodyFont: { size: 12 },
        bodyColor: 'black',
        borderColor: 'black',
        borderWidth: 1,
        padding: 12,
        caretPadding: 4,
        boxPadding: 4,
        usePointStyle: true,
        filter: (tooltipItem) => tooltipItem.dataset.id === 'measurementData',
        callbacks: {
            title: () => '',
            beforeLabel: (tooltipItem) => {
                const date = new Date(tooltipItem.raw.eventDate).toLocaleDateString();
                return `${i18n.t('Date')}: ${date}`;
            },
            label: (tooltipItem) => {
                let yValue = Number(tooltipItem.formattedValue.replace(',', '.'));
                let xValue = Number(tooltipItem.label.replace(',', '.'));

                let xLabel = '';

                yValue = Number(yValue.toFixed(2));
                xValue = Number(xValue.toFixed(2));

                const yLabel = `${yAxisLabel}: ${yValue} ${yUnit}`;
                xLabel = `${xAxisLabel}: ${xValue} ${xUnit}`;

                if (xAxisLabel === 'Weeks') {
                    const weeks = xValue % 4;
                    const months = Math.floor(xValue / 4);
                    xLabel = (months === 0 ? `${i18n.t('Age')}: ${weeks.toFixed(0)} ${i18n.t('Weeks')}`
                        : `${i18n.t('Age')}: ${months} ${i18n.t('Months')} ${weeks.toFixed(0)} ${i18n.t('Weeks')}`);
                }
                if (xAxisLabel === 'Months') {
                    const months = xValue % 12;
                    const years = Math.floor(xValue / 12);
                    xLabel = (years === 0 ? `${i18n.t('Age')}: ${months.toFixed(0)} ${i18n.t('Months')}`
                        : `${i18n.t('Age')}: ${years} ${i18n.t('Years')} ${months.toFixed(0)} ${i18n.t('Months')}`);
                }

                const labels = [];
                labels.push(yLabel);
                labels.push(xLabel);

                return labels;
            },
        },
    };
};
