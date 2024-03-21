export function useCalculateMinMaxValues(datasetValues: Array<any>) {
    if (!datasetValues) {
        return { min: 0, max: 0 };
    }
    const flatValues: number[] = datasetValues.flatMap((entry: any) => Number(Object.values(entry)));
    return {
        min: Math.min(...flatValues),
        max: Math.max(...flatValues),
    };
}
