import React from "react";
import { GrowthChartBuilder } from "./GrowthChartBuilder";
import { chartData } from "../../DataSets/ChartData";
import { useRangeTimePeriode } from './useRangeTimePeriode';
import { EllipsisButton } from "./EllipsisButton";

export const GrowthChart = () => {
    const { datasets, metadata } = chartData["Weight-for-age GIRLS"];
    const dataSetValues = datasets["Girls0to5Years"];
    const dataSetMetadata = metadata["Girls0to5Years"];

    const xLabelValues = useRangeTimePeriode(dataSetMetadata.range.start, dataSetMetadata.range.end);
    const keysDataSet = Object.keys(dataSetValues[0]);

    if (xLabelValues.length !== dataSetValues.length) {
        console.error('xLabelValues and dataSet should have the same length');
    }

    return (<>
        <GrowthChartBuilder
            dataSetValues={dataSetValues}
            dataSetMetadata={dataSetMetadata}
            xLabelValues={xLabelValues}
            keysDataSet={keysDataSet}
        />
        <EllipsisButton onClick={() => console.log('clicked')} />
    </>
    );
};
