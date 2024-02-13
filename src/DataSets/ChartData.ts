import { wfa_g_0_5_z } from "./WhoStandardDataSets"

export const chartData = {
    "Weight-for-age GIRLS": {
      datasets: {
        "Girls0to5Years": wfa_g_0_5_z,

      },
      metadata: [
        { label: "Girls 0 to 5 years", value: "Girls0to5Years", yaxis: "weight (kg)", xaxis: "age (Month)"},
      ],
    },
  };