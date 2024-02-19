import React from "react";
import { GrowthChartBuilder } from "./GrowthChartBuilder";
import { chartData } from "../../DataSets/ChartData";
import { EllipsisButton } from "./EllipsisButton";

export const GrowthChart = (): JSX.Element => {
    const selectedChart = chartData["Weight-for-age GIRLS"]

    return (
        <>
        <GrowthChartBuilder
            chartData={selectedChart}
        />
        <EllipsisButton handleDelete={() => console.log("Delete")} />
        </>
        
    )
}