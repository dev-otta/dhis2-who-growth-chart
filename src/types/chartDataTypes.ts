import i18n from '@dhis2/d2-i18n';

export interface ChartDataTypes {
    dataSetValues: { [key: string]: number }[];
    dataSetMetadata: {
        label: string;
        measurementType: string;
        timeUnit: string;
        range: { start: number; end: number };
    };
    xAxisValues: number[];
    yAxisValues: { minDataValue: number; maxDataValue: number };
    keysDataSet: string[];
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

export const CategoryCodes = Object.freeze({
    hcfa_b: i18n.t('Head circumference-for-age BOYS'),
    hcfa_g: i18n.t('Head circumference-for-age GIRLS'),
    lhfa_b: i18n.t('Length/height-for-age BOYS'),
    lhfa_g: i18n.t('Length/height-for-age GIRLS'),
    wfa_b: i18n.t('Weight-for-age BOYS'),
    wfa_g: i18n.t('Weight-for-age GIRLS'),
    wflh_b: i18n.t('Weight-for-length/height BOYS'),
    wflh_g: i18n.t('Weight-for-length/height GIRLS'),
});

export const ChartLabelCodes = Object.freeze({
    b_0_5_y: i18n.t('Boys 0 to 5 years'),
    b_0_13_w: i18n.t('Boys 0 to 13 weeks'),
    g_0_5_y: i18n.t('Girls 0 to 5 years'),
    g_0_5_w: i18n.t('Girls 0 to 5 weeks'),
    b_0_2_y: i18n.t('Boys 0 to 2 years'),
    b_2_5_y: i18n.t('Boys 2 to 5 years'),
    g_0_2_y: i18n.t('Girls 0 to 2 years'),
    g_2_5_y: i18n.t('Girls 2 to 5 years'),
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
