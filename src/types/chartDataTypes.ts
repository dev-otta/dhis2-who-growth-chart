import i18n from '@dhis2/d2-i18n'

export interface ChartDataTypes {
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


export const ChartCodes = Object.freeze({
    wfa_g_0_5_z: i18n.t('Girls 0 to 5 years'),
  });
  

    
