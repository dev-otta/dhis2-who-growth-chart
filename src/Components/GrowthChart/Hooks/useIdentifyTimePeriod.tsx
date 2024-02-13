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

export const useIdentifyTimePeriod = (data: DataPoint[]): 'Week' | 'Month' | 'Year' | '' => {
    if (data.length === 0) return '';

    if ('Week' in data[0]) return 'Week';
    if ('Month' in data[0]) return 'Month';
    if ('Year' in data[0]) return 'Year';

    return '';
}