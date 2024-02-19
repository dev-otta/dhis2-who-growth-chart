export interface ChartDataTypes {
    showAnnotation: boolean;
    dataSetValues: { [key: string]: number }[];
    dataSetMetadata: {
        label: string;
        yaxis: string;
        unit: string;
        range: { start: number; end: number };
    };
    xLabelValues: number[];
    keysDataSet: string[];
}
