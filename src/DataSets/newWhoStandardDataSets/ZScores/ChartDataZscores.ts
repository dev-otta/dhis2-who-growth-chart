import { wfa_g_0_5_y_z, wfa_g_0_13_w_z } from "./wfa-girls";
import { ChartCodes } from "../../../types/chartDataTypes";


export const chartData = {
  "Weight-for-age GIRLS": {
    datasets: {
      [ChartCodes.wfa_g_0_5_y_z]: {
        datasetValues: wfa_g_0_5_y_z,
        metadata: {
          label: ChartCodes.wfa_g_0_5_y_z,
          yaxis: "Weight (kg)",
          unit: "Months",
          range: { start: 0, end: 60 }
        }
      },
      [ChartCodes.wfa_g_0_13_w_z]: {
        datasetValues: wfa_g_0_13_w_z,
        metadata: {
          label: ChartCodes.wfa_g_0_13_w_z,
          yaxis: "Weight (kg)",
          unit: "Weeks",
          range: { start: 0, end: 13 }
        }
      
      }
    }
  };
