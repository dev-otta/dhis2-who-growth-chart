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
            [ChartCodes.hcfa_b_0_13_w_z]: {
                datasetValues: hcfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_b_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.hc_cm,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.hcfa_b_0_5_y_z]: {
                datasetValues: hcfa_b_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_b_0_5_y_z.label,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.hc_cm,
                    range: { start: 0, end: 60 },
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
            [ChartCodes.hcfa_g_0_13_w_z]: {
                datasetValues: hcfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_g_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.hc_cm,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.hcfa_g_0_5_y_z]: {
                datasetValues: hcfa_g_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_g_0_5_y_z,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.hc_cm,
                    range: { start: 0, end: 60 },
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
            [ChartCodes.lhfa_b_0_13_w_z]: {
                datasetValues: lhfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.l_cm,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.lhfa_b_0_2_y_z]: {
                datasetValues: lhfa_b_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_0_2_y_z,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.l_cm,
                    range: { start: 0, end: 24 },
                },
            },
            [ChartCodes.lhfa_b_2_5_y_z]: {
                datasetValues: lhfa_b_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_2_5_y_z,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.h_cm,
                    range: { start: 24, end: 60 },
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
            [ChartCodes.lhfa_g_0_13_w_z]: {
                datasetValues: lhfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.l_cm,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.lhfa_g_0_2_y_z]: {
                datasetValues: lhfa_g_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_0_2_y_z.label,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.l_cm,
                    range: { start: 0, end: 24 },
                },
            },
            [ChartCodes.lhfa_g_2_5_y_z]: {
                datasetValues: lhfa_g_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_2_5_y_z,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.h_cm,
                    range: { start: 24, end: 60 },
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
            [ChartCodes.wfa_b_0_13_w_z]: {
                datasetValues: wfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_b_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.wfa_b_0_5_y_z]: {
                datasetValues: wfa_b_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_b_0_5_y_z.label,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 0, end: 60 },
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
            [ChartCodes.wfa_g_0_13_w_z]: {
                datasetValues: wfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_g_0_13_w_z,
                    xAxisLabel: timeUnitCodes.weeks,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.wfa_g_0_5_y_z]: {
                datasetValues: wfa_g_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_g_0_5_y_z.label,
                    xAxisLabel: timeUnitCodes.months,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 0, end: 60 },
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
            [ChartCodes.wfl_b_0_2_y_z]: {
                datasetValues: wfl_b_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfl_b_0_2_y_z.label,
                    xAxisLabel: measurementTypeCodes.l_cm,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 45, end: 110 },
                },
            },
            [ChartCodes.wfh_b_2_5_y_z]: {
                datasetValues: wfh_b_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfh_b_2_5_y_z,
                    xAxisLabel: measurementTypeCodes.h_cm,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 65, end: 120 },
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
            [ChartCodes.wfl_g_0_2_y_z]: {
                datasetValues: wfl_g_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfl_g_0_2_y_z.label,
                    xAxisLabel: measurementTypeCodes.l_cm,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 45, end: 110 },
                },
            },
            [ChartCodes.wfh_g_2_5_y_z]: {
                datasetValues: wfh_g_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfh_g_2_5_y_z,
                    xAxisLabel: measurementTypeCodes.h_cm,
                    yAxisLabel: measurementTypeCodes.w_kg,
                    range: { start: 65, end: 120 },
                },
            },
        },
    },
};
