export const useRangeTimePeriod = (start: number, end: number) => Array.from(
    { length: end - start + 1 },
    (_, index) => start + index,
);
