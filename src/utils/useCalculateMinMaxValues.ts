export function useCalculateMinMaxValues(datasetValues: Array<any>) {
    const flatValues: number[] = datasetValues.flatMap((entry: any) => Object.values(entry)) as number[];
    return {
        min: Math.min(...flatValues),
        max: Math.max(...flatValues),
    };
}
