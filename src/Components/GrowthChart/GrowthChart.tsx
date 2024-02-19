import React from "react";
import { GrowthChartBuilder } from "./GrowthChartBuilder";
import { chartData } from "../../DataSets/newWhoStandardDataSets/ZScores/ChartDataZscores";
import { useRangeTimePeriode } from './useRangeTimePeriode';
import { ChartCodes } from "../../types/chartDataTypes";

export const GrowthChart = () => {
    const categoryDataSets = chartData["Weight-for-age GIRLS"];
    const dataSetEntry = categoryDataSets.datasets[ChartCodes.wfa_g_0_5_y_z];
    
    const dataSetValues = dataSetEntry.datasetValues;
    const dataSetMetadata = dataSetEntry.metadata;
    
    const xLabelValues = useRangeTimePeriode(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSetValues[0]);

    if (xLabelValues.length !== dataSetValues.length) {
        console.error('xLabelValues and dataSet should have the same length');
    }

    return <GrowthChartBuilder
        dataSetValues={dataSetValues}
        dataSetMetadata={dataSetMetadata}
        xLabelValues={xLabelValues}
        keysDataSet={keysDataSet} 
    />;
};
