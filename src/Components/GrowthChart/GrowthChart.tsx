import React from "react";
import { GrowthChartBuilder } from "./GrowthChartBuilder";
import { chartData } from "../../DataSets/ChartData";

export const GrowthChart = () => {
    const selectedChart = chartData["Weight-for-age GIRLS"]

    console.log(selectedChart)

    return (
        <div>
            <GrowthChartBuilder 
                chartData={selectedChart}
            />
        </div>
    )
}