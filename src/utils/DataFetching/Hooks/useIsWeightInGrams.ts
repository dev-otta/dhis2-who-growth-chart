export const useIsWeightInGrams = (isWeightInGrams: boolean, weightValue: number) => (isWeightInGrams || weightValue > 1000);
