import i18n from '@dhis2/d2-i18n';
import { Scriptable, ScriptableTooltipContext, TooltipPositionerMap } from 'chart.js';

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
        label: (tooltipItem: any) => string;
    };
}

export const tooltipConfig = (formattedFieldName: string, category: string): TooltipConfig => {
    console.log('formattedFieldName', formattedFieldName);
    console.log('category', category);
    return {
        enabled: true,
        intersect: false,
        position: 'nearest' as Scriptable<keyof TooltipPositionerMap, ScriptableTooltipContext<'line'>>,
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
                if (category === 'wflh_b' || category === 'wflh_g') {
                    return `${i18n.t('Height')}: ${tooltipItem.label} | ${i18n.t('Weight')}: ${tooltipItem.formattedValue}`;
                }
                const value = tooltipItem.formattedValue;
                return `${formattedFieldName}: ${value}`;
            },
        },
    };
};
