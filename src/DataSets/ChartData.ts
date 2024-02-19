import { wfa_g_0_5_z } from "./WhoStandardDataSets"
import { ChartCodes } from "../types/chartDataTypes";


export const chartData = {
  "Weight-for-age GIRLS": {
    datasets: {
      [ChartCodes.wfa_g_0_5_z]: {
        datasetValues: wfa_g_0_5_z,
        metadata: {
          label: ChartCodes.wfa_g_0_5_z,
          yaxis: "Weight (kg)",
          unit: "Months",
          range: { start: 0, end: 60 }
        }
      },
      
      }
    }
  };
