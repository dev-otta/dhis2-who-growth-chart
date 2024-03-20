import { hcfa_b_0_5_y_z, hcfa_b_0_13_w_z } from './ZScores/hcfa-boys';
import { hcfa_g_0_5_y_z, hcfa_g_0_13_w_z } from './ZScores/hcfa-girls';
import { lhfa_b_0_2_y_z, lhfa_b_0_13_w_z, lhfa_b_2_5_y_z } from './ZScores/lhfa-boys';
import { lhfa_g_0_2_y_z, lhfa_g_0_13_w_z, lhfa_g_2_5_y_z } from './ZScores/lhfa-girls';
import { wfa_b_0_5_y_z, wfa_b_0_13_w_z } from './ZScores/wfa-boys';
import { wfa_g_0_5_y_z, wfa_g_0_13_w_z } from './ZScores/wfa-girls';
import { wfh_g_2_5_y_z, wfl_g_0_2_y_z } from './ZScores/wfhl-girls';
import { wfh_b_2_5_y_z, wfl_b_0_2_y_z } from './ZScores/wfhl-boys';
import { ChartCodes,
    CategoryCodes,
    MeasurementTypeCodesLabel,
    TimeUnitCodes,
    ChartData,
    GenderCodes,
    CategoryLabels } from '../../types/chartDataTypes';

export const chartData: ChartData = {
    [CategoryCodes.hcfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.hcfa,
            gender: GenderCodes.CGC_Male,
        },
        datasets: {
            [ChartCodes.hcfa_b_0_13_w_z]: {
                datasetValues: hcfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_b_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.headCircumference,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.hcfa_b_0_5_y_z]: {
                datasetValues: hcfa_b_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_b_0_5_y_z.label,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.headCircumference,
                    range: { start: 0, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.hcfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.hcfa,
            gender: GenderCodes.CGC_Female,
        },
        datasets: {
            [ChartCodes.hcfa_g_0_13_w_z]: {
                datasetValues: hcfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_g_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.headCircumference,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.hcfa_g_0_5_y_z]: {
                datasetValues: hcfa_g_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.hcfa_g_0_5_y_z,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.headCircumference,
                    range: { start: 0, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.lhfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.lhfa,
            gender: GenderCodes.CGC_Male,
        },
        datasets: {
            [ChartCodes.lhfa_b_0_13_w_z]: {
                datasetValues: lhfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.length,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.lhfa_b_0_2_y_z]: {
                datasetValues: lhfa_b_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_0_2_y_z,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.length,
                    range: { start: 0, end: 24 },
                },
            },
            [ChartCodes.lhfa_b_2_5_y_z]: {
                datasetValues: lhfa_b_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_b_2_5_y_z,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.height,
                    range: { start: 24, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.lhfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.lhfa,
            gender: GenderCodes.CGC_Female,
        },
        datasets: {
            [ChartCodes.lhfa_g_0_13_w_z]: {
                datasetValues: lhfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.length,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.lhfa_g_0_2_y_z]: {
                datasetValues: lhfa_g_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_0_2_y_z.label,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.length,
                    range: { start: 0, end: 24 },
                },
            },
            [ChartCodes.lhfa_g_2_5_y_z]: {
                datasetValues: lhfa_g_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.lhfa_g_2_5_y_z,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.height,
                    range: { start: 24, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.wfa_b]: {
        categoryMetadata: {
            label: CategoryLabels.wfa,
            gender: GenderCodes.CGC_Male,
        },
        datasets: {
            [ChartCodes.wfa_b_0_13_w_z]: {
                datasetValues: wfa_b_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_b_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.wfa_b_0_5_y_z]: {
                datasetValues: wfa_b_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_b_0_5_y_z.label,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 0, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.wfa_g]: {
        categoryMetadata: {
            label: CategoryLabels.wfa,
            gender: GenderCodes.CGC_Female,
        },
        datasets: {
            [ChartCodes.wfa_g_0_13_w_z]: {
                datasetValues: wfa_g_0_13_w_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_g_0_13_w_z,
                    xAxisLabel: TimeUnitCodes.weeks,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 0, end: 13 },
                },
            },
            [ChartCodes.wfa_g_0_5_y_z]: {
                datasetValues: wfa_g_0_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfa_g_0_5_y_z.label,
                    xAxisLabel: TimeUnitCodes.months,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 0, end: 60 },
                },
            },
        },
    },
    [CategoryCodes.wflh_b]: {
        categoryMetadata: {
            label: CategoryLabels.wflh,
            gender: GenderCodes.CGC_Male,
        },
        datasets: {
            [ChartCodes.wfl_b_0_2_y_z]: {
                datasetValues: wfl_b_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfl_b_0_2_y_z.label,
                    xAxisLabel: MeasurementTypeCodesLabel.length,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 45, end: 110 },
                },
            },
            [ChartCodes.wfh_b_2_5_y_z]: {
                datasetValues: wfh_b_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfh_b_2_5_y_z,
                    xAxisLabel: MeasurementTypeCodesLabel.height,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 65, end: 120 },
                },
            },
        },
    },
    [CategoryCodes.wflh_g]: {
        categoryMetadata: {
            label: CategoryLabels.wflh,
            gender: GenderCodes.CGC_Female,
        },
        datasets: {
            [ChartCodes.wfl_g_0_2_y_z]: {
                datasetValues: wfl_g_0_2_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfl_g_0_2_y_z.label,
                    xAxisLabel: MeasurementTypeCodesLabel.length,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 45, end: 110 },
                },
            },
            [ChartCodes.wfh_g_2_5_y_z]: {
                datasetValues: wfh_g_2_5_y_z,
                metadata: {
                    chartLabel: ChartCodes.wfh_g_2_5_y_z,
                    xAxisLabel: MeasurementTypeCodesLabel.height,
                    yAxisLabel: MeasurementTypeCodesLabel.weight,
                    range: { start: 65, end: 120 },
                },
            },
        },
    },
};
