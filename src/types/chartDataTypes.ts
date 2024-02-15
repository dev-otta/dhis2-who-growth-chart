export interface ChartData {
    datasets: {
        [key: string]: {
            [key: string]: number;
        }[];
    };
    metadata: {
        [key: string]: {
            label: string;
            yaxis: string;
            unit: string;
            range: {
                start: number;
                end: number;
            }
        };
    };
}