import React from "react";
import { GrowthChartBuilder } from "./GrowthChartBuilder";
import { chartData } from "../../DataSets/ChartData";

export const GrowthChart = () => {
    const selectedChart = chartData["Weight-for-age GIRLS"]

    return (
        <GrowthChartBuilder
            chartData={selectedChart}
        />
    )
}