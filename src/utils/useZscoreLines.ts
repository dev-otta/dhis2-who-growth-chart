import { useEffect, useState } from 'react';
import { chartLineColorPicker } from './chartLineColorPicker';

interface DatasetValues {
    [key: string]: number;
}

export const useZscoreLines = (
    datasetValues: DatasetValues[],
    keysDataSet: string[],
    datasetMetadata: any,
    category: string,
    dataset: string | number,
    startIndex: number,
) => {
    const [zScoreLines, setZScoreLines] = useState<any[]>([]);

    useEffect(() => {
        const ZscoreLines = keysDataSet.map((key) => ({
            data: datasetValues.map((entry, index) => ({
                x: startIndex + index,
                y: entry[key],
            })),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
            label: key,
        }));

        setZScoreLines(ZscoreLines);
    }, [datasetValues, keysDataSet, datasetMetadata, category, dataset, startIndex]);

    return zScoreLines;
};
