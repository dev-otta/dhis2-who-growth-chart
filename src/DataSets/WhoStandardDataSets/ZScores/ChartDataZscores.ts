import { hcfa_b_0_5_y_z, hcfa_b_0_13_w_z } from './hcfa-boys';
import { hcfa_g_0_5_y_z, hcfa_g_0_13_w_z } from './hcfa-girls';
import { lhfa_b_0_2_y_z, lhfa_b_0_13_w_z, lhfa_b_2_5_y_z } from './lhfa-boys';
import { lhfa_g_0_2_y_z, lhfa_g_0_13_w_z, lhfa_g_2_5_y_z } from './lhfa-girls';
import { wfa_b_0_5_y_z, wfa_b_0_13_w_z } from './wfa-boys';
import { wfa_g_0_5_y_z, wfa_g_0_13_w_z } from './wfa-girls';
import { wfh_g_2_5_y_z, wfl_g_0_2_y_z } from './wfhl-girls';
import { wfh_b_2_5_y_z, wfl_b_0_2_y_z } from './wfhl-boys';
import { ChartCodes,
    CategoryCodes,
    measurementTypeCodes,
    timeUnitCodes,
    ChartData,
    GenderCodes } from '../../../types/chartDataTypes';

export const chartData: ChartData = {
    [CategoryCodes.hcfa_b]: {
        datasets: {
            [ChartCodes.hcfa_b_0_5_y_z]: {
                datasetValues: hcfa_b_0_5_y_z,
                metadata: {
                    label: ChartCodes.hcfa_b_0_5_y_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.boys,
                },
            },
            [ChartCodes.hcfa_b_0_13_w_z]: {
                datasetValues: hcfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.hcfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.boys,
                },
            },
        },
    },
    [CategoryCodes.hcfa_g]: {
        datasets: {
            [ChartCodes.hcfa_g_0_5_y_z]: {
                datasetValues: hcfa_g_0_5_y_z,
                metadata: {
                    label: ChartCodes.hcfa_g_0_5_y_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.girls,
                },
            },
            [ChartCodes.hcfa_g_0_13_w_z]: {
                datasetValues: hcfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.hcfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.girls,
                },
            },
        },
    },
    [CategoryCodes.lhfa_b]: {
        datasets: {
            [ChartCodes.lhfa_b_0_2_y_z]: {
                datasetValues: lhfa_b_0_2_y_z,
                metadata: {
                    label: ChartCodes.lhfa_b_0_2_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 24 },
                    gender: GenderCodes.boys,
                },
            },
            [ChartCodes.lhfa_b_0_13_w_z]: {
                datasetValues: lhfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.lhfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.boys,
                },
            },
            [ChartCodes.lhfa_b_2_5_y_z]: {
                datasetValues: lhfa_b_2_5_y_z,
                metadata: {
                    label: ChartCodes.lhfa_b_2_5_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 24, end: 60 },
                    gender: GenderCodes.boys,
                },
            },
        },
    },
    [CategoryCodes.lhfa_g]: {
        datasets: {
            [ChartCodes.lhfa_g_0_2_y_z]: {
                datasetValues: lhfa_g_0_2_y_z,
                metadata: {
                    label: ChartCodes.lhfa_g_0_2_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 24 },
                    gender: GenderCodes.girls,
                },
            },
            [ChartCodes.lhfa_g_0_13_w_z]: {
                datasetValues: lhfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.lhfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.girls,
                },
            },
            [ChartCodes.lhfa_g_2_5_y_z]: {
                datasetValues: lhfa_g_2_5_y_z,
                metadata: {
                    label: ChartCodes.lhfa_g_2_5_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 24, end: 60 },
                    gender: GenderCodes.girls,
                },
            },
        },
    },
    [CategoryCodes.wfa_b]: {
        datasets: {
            [ChartCodes.wfa_b_0_5_y_z]: {
                datasetValues: wfa_b_0_5_y_z,
                metadata: {
                    label: ChartCodes.wfa_b_0_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.boys,
                },
            },
            [ChartCodes.wfa_b_0_13_w_z]: {
                datasetValues: wfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.wfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.boys,
                },
            },
        },
    },
    [CategoryCodes.wfa_g]: {
        datasets: {
            [ChartCodes.wfa_g_0_5_y_z]: {
                datasetValues: wfa_g_0_5_y_z,
                metadata: {
                    label: ChartCodes.wfa_g_0_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.girls,
                },
            },
            [ChartCodes.wfa_g_0_13_w_z]: {
                datasetValues: wfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.wfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.girls,
                },
            },
        },
    },
    [CategoryCodes.wflh_b]: {
        datasets: {
            [ChartCodes.wfh_b_2_5_y_z]: {
                datasetValues: wfh_b_2_5_y_z,
                metadata: {
                    label: ChartCodes.wfh_b_2_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: measurementTypeCodes.h_cm,
                    range: { start: 65, end: 120 },
                    gender: GenderCodes.boys,
                },
            },
            [ChartCodes.wfl_b_0_2_y_z]: {
                datasetValues: wfl_b_0_2_y_z,
                metadata: {
                    label: ChartCodes.wfl_b_0_2_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 45, end: 110 },
                    gender: GenderCodes.boys,
                },
            },
        },
    },
    [CategoryCodes.wflh_g]: {
        datasets: {
            [ChartCodes.wfh_g_2_5_y_z]: {
                datasetValues: wfh_g_2_5_y_z,
                metadata: {
                    label: ChartCodes.wfh_g_2_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 65, end: 120 },
                    gender: GenderCodes.girls,
                },
            },
            [ChartCodes.wfl_g_0_2_y_z]: {
                datasetValues: wfl_g_0_2_y_z,
                metadata: {
                    label: ChartCodes.wfl_g_0_2_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 45, end: 110 },
                    gender: GenderCodes.girls,
                },
            },
        },
    },
};
