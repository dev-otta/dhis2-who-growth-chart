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
    GenderCodes,
    CategoryLabels } from '../../../types/chartDataTypes';

export const chartData: ChartData = {
    [CategoryCodes.hcfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.hcfa,
            gender: GenderCodes.male,
        },
        datasets: {
            [ChartCodes.hcfa_b_0_5_y_z]: {
                datasetValues: hcfa_b_0_5_y_z,
                metadata: {
                    label: ChartCodes.hcfa_b_0_5_y_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.male,
                },
            },
            [ChartCodes.hcfa_b_0_13_w_z]: {
                datasetValues: hcfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.hcfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.male,
                },
            },
        },
    },
    [CategoryCodes.hcfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.hcfa,
            gender: GenderCodes.female,
        },
        datasets: {
            [ChartCodes.hcfa_g_0_5_y_z]: {
                datasetValues: hcfa_g_0_5_y_z,
                metadata: {
                    label: ChartCodes.hcfa_g_0_5_y_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.female,
                },
            },
            [ChartCodes.hcfa_g_0_13_w_z]: {
                datasetValues: hcfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.hcfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.hc_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.female,
                },
            },
        },
    },
    [CategoryCodes.lhfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.lhfa,
            gender: GenderCodes.male,
        },
        datasets: {
            [ChartCodes.lhfa_b_0_2_y_z]: {
                datasetValues: lhfa_b_0_2_y_z,
                metadata: {
                    label: ChartCodes.lhfa_b_0_2_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 24 },
                    gender: GenderCodes.male,
                },
            },
            [ChartCodes.lhfa_b_0_13_w_z]: {
                datasetValues: lhfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.lhfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.male,
                },
            },
            [ChartCodes.lhfa_b_2_5_y_z]: {
                datasetValues: lhfa_b_2_5_y_z,
                metadata: {
                    label: ChartCodes.lhfa_b_2_5_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 24, end: 60 },
                    gender: GenderCodes.male,
                },
            },
        },
    },
    [CategoryCodes.lhfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.lhfa,
            gender: GenderCodes.female,
        },
        datasets: {
            [ChartCodes.lhfa_g_0_2_y_z]: {
                datasetValues: lhfa_g_0_2_y_z,
                metadata: {
                    label: ChartCodes.lhfa_g_0_2_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 24 },
                    gender: GenderCodes.female,
                },
            },
            [ChartCodes.lhfa_g_0_13_w_z]: {
                datasetValues: lhfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.lhfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.female,
                },
            },
            [ChartCodes.lhfa_g_2_5_y_z]: {
                datasetValues: lhfa_g_2_5_y_z,
                metadata: {
                    label: ChartCodes.lhfa_g_2_5_y_z.label,
                    measurementType: measurementTypeCodes.lh_cm,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 24, end: 60 },
                    gender: GenderCodes.female,
                },
            },
        },
    },
    [CategoryCodes.wfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.wfa,
            gender: GenderCodes.male,
        },
        datasets: {
            [ChartCodes.wfa_b_0_5_y_z]: {
                datasetValues: wfa_b_0_5_y_z,
                metadata: {
                    label: ChartCodes.wfa_b_0_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.male,
                },
            },
            [ChartCodes.wfa_b_0_13_w_z]: {
                datasetValues: wfa_b_0_13_w_z,
                metadata: {
                    label: ChartCodes.wfa_b_0_13_w_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.male,
                },
            },
        },
    },
    [CategoryCodes.wfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.wfa,
            gender: GenderCodes.female,
        },
        datasets: {
            [ChartCodes.wfa_g_0_5_y_z]: {
                datasetValues: wfa_g_0_5_y_z,
                metadata: {
                    label: ChartCodes.wfa_g_0_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 0, end: 60 },
                    gender: GenderCodes.female,
                },
            },
            [ChartCodes.wfa_g_0_13_w_z]: {
                datasetValues: wfa_g_0_13_w_z,
                metadata: {
                    label: ChartCodes.wfa_g_0_13_w_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.weeks,
                    range: { start: 0, end: 13 },
                    gender: GenderCodes.female,
                },
            },
        },
    },
    [CategoryCodes.wflh_b]: {
        categoryMetadata: {
            label: CategoryLabels.wflh,
            gender: GenderCodes.male,
        },
        datasets: {
            [ChartCodes.wfh_b_2_5_y_z]: {
                datasetValues: wfh_b_2_5_y_z,
                metadata: {
                    label: ChartCodes.wfh_b_2_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: measurementTypeCodes.h_cm,
                    range: { start: 65, end: 120 },
                    gender: GenderCodes.male,
                },
            },
            [ChartCodes.wfl_b_0_2_y_z]: {
                datasetValues: wfl_b_0_2_y_z,
                metadata: {
                    label: ChartCodes.wfl_b_0_2_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 45, end: 110 },
                    gender: GenderCodes.male,
                },
            },
        },
    },
    [CategoryCodes.wflh_g]: {
        categoryMetadata: {
            label: CategoryLabels.wflh,
            gender: GenderCodes.female,
        },
        datasets: {
            [ChartCodes.wfh_g_2_5_y_z]: {
                datasetValues: wfh_g_2_5_y_z,
                metadata: {
                    label: ChartCodes.wfh_g_2_5_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 65, end: 120 },
                    gender: GenderCodes.female,
                },
            },
            [ChartCodes.wfl_g_0_2_y_z]: {
                datasetValues: wfl_g_0_2_y_z,
                metadata: {
                    label: ChartCodes.wfl_g_0_2_y_z.label,
                    measurementType: measurementTypeCodes.w_kg,
                    timeUnit: timeUnitCodes.months,
                    range: { start: 45, end: 110 },
                    gender: GenderCodes.female,
                },
            },
        },
    },
};
