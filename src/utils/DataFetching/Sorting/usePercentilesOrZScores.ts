export const usePercentilesOrZScores = (category: any, usePercentiles: boolean): any[] | undefined => {
    if (category) {
        return usePercentiles ? category.percentileDatasetValues : category.zScoreDatasetValues;
    }
    return undefined;
};
