import i18n from '@dhis2/d2-i18n';
import { AnnotationLabelType } from '../Components/GrowthChart/GrowthChartOptions';

export interface ChartDataTypes {
    datasetValues: { [key: string]: number }[];
    datasetMetadata: {
        label: string;
        measurementType: string;
        timeUnit: string;
        range: { start: number; end: number };
        gender: string;
    };
    xAxisValues: number[];
    yAxisValues: { minDataValue: number; maxDataValue: number };
    keysDataSet: string[];
    annotations: AnnotationLabelType[];
}

export interface ChartData {
    [key: string]: {
        categoryMetadata?: {
            label: string;
            gender: string;
        };
        datasets: { [key: string]: {
            datasetValues: { [key: string]: number }[];
            metadata: {
                label: string;
                measurementType: string;
                timeUnit: string;
                range: { start: number; end: number };
                gender: string;
                };
            }
        };
    };
}

export const timeUnitCodes = Object.freeze({
    months: i18n.t('Months'),
    weeks: i18n.t('Weeks'),
});

export const measurementTypeCodes = Object.freeze({
    hc_cm: i18n.t('Head circumference (cm)'),
    lh_cm: i18n.t('Length/height (cm)'),
    l_cm: i18n.t('Length (cm)'),
    h_cm: i18n.t('Height (cm)'),
    w_kg: i18n.t('Weight (kg)'),
});

export const CategoryLabels = Object.freeze({
    hcfa: i18n.t('Head circumference for age'),
    lhfa: i18n.t('Length/height for age'),
    wfa: i18n.t('Weight for age'),
    wflh: i18n.t('Weight for length/height'),
});

export const CategoryCodes = Object.freeze({
    hcfa_b: 'hcfa_b',
    hcfa_g: 'hcfa_g',
    lhfa_b: 'lhfa_b',
    lhfa_g: 'lhfa_g',
    wfa_b: 'wfa_b',
    wfa_g: 'wfa_g',
    wflh_b: 'wflh_b',
    wflh_g: 'wflh_g',
});

export const CategoryToLabel = Object.freeze({
    hcfa_b: CategoryLabels.hcfa,
    hcfa_g: CategoryLabels.hcfa,
    lhfa_b: CategoryLabels.lhfa,
    lhfa_g: CategoryLabels.lhfa,
    wfa_b: CategoryLabels.wfa,
    wfa_g: CategoryLabels.wfa,
    wflh_b: CategoryLabels.wflh,
    wflh_g: CategoryLabels.wflh,
});

export const ChartLabelCodes = Object.freeze({
    b_0_5_y: i18n.t('0 to 5 years'),
    b_0_13_w: i18n.t('0 to 13 weeks'),
    g_0_5_y: i18n.t('0 to 5 years'),
    g_0_5_w: i18n.t('0 to 5 weeks'),
    b_0_2_y: i18n.t('0 to 2 years'),
    b_2_5_y: i18n.t('2 to 5 years'),
    g_0_2_y: i18n.t('0 to 2 years'),
    g_2_5_y: i18n.t('2 to 5 years'),
});

export const ChartCodes = Object.freeze({
    hcfa_b_0_5_y_z: ChartLabelCodes.b_0_5_y,
    hcfa_b_0_13_w_z: ChartLabelCodes.b_0_13_w,
    hcfa_g_0_5_y_z: ChartLabelCodes.g_0_5_y,
    hcfa_g_0_13_w_z: ChartLabelCodes.g_0_5_w,
    lhfa_b_0_2_y_z: ChartLabelCodes.b_0_2_y,
    lhfa_b_0_13_w_z: ChartLabelCodes.b_0_13_w,
    lhfa_b_2_5_y_z: ChartLabelCodes.b_2_5_y,
    lhfa_g_0_2_y_z: ChartLabelCodes.g_0_2_y,
    lhfa_g_0_13_w_z: ChartLabelCodes.b_0_13_w,
    lhfa_g_2_5_y_z: ChartLabelCodes.g_2_5_y,
    wfa_b_0_5_y_z: ChartLabelCodes.b_0_5_y,
    wfa_b_0_13_w_z: ChartLabelCodes.b_0_13_w,
    wfa_g_0_5_y_z: ChartLabelCodes.g_0_5_y,
    wfa_g_0_13_w_z: ChartLabelCodes.g_0_5_w,
    wfh_g_2_5_y_z: ChartLabelCodes.g_2_5_y,
    wfl_g_0_2_y_z: ChartLabelCodes.g_0_2_y,
    wfh_b_2_5_y_z: ChartLabelCodes.b_2_5_y,
    wfl_b_0_2_y_z: ChartLabelCodes.b_0_2_y,
});

export const GenderCodes = Object.freeze({
    male: i18n.t('Boys'),
    female: i18n.t('Girls'),
});
