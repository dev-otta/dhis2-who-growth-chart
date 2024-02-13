interface DataPoint {
    Week?: number;
    Month?: number;
    Year?: number;
    SD3neg?: number;
    SD2neg?: number;
    SD1neg?: number;
    SD0?: number;
    SD1?: number;
    SD2?: number;
    SD3?: number;
    P01?: number;
    P1?: number;
    P3?: number;
    P5?: number;
    P10?: number;
    P15?: number;
    P25?: number;
    P50?: number;
    P75?: number;
    P85?: number;
    P90?: number;
    P95?: number;
    P97?: number;
    P99?: number;
    P999?: number;
}

export const useIdentifyPercentileOrZScore = (data: DataPoint[]): 
// { timeperiod: string, percent: boolean } 
boolean => {
//    Commented code identify timeperiod
    // if (data.length === 0) return { timeperiod: '', percent: false };

    // let timeperiod = '';

    // if('Week' in data[0]) timeperiod = 'Week';
    // if('Month' in data[0]) timeperiod = 'Month';
    // if('Year' in data[0]) timeperiod = 'Year';

    return ['P01', 'P1', 'P3', 'P5', 'P10', 'P15', 'P25', 'P50', 'P75', 'P85', 'P90', 'P95', 'P97', 'P99', 'P999'].some((prop) => prop in data[0]);

    // return { timeperiod, percent };
};

