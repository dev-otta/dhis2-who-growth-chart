import { useMemo } from 'react';
import { ChartData, MeasurementData } from '../../../types/chartDataTypes';

export const useFilterByMissingData = (measurementData: MeasurementData[], chartData: ChartData) => {
    if (!chartData || !measurementData) {
        return {};
    }
    const requiredData = Object.freeze({
        hcfa_b: { headCircumference: true },
        hcfa_g: { headCircumference: true },
        lhfa_b: { height: true },
        lhfa_g: { height: true },
        wfa_b: { weight: true },
        wfa_g: { weight: true },
        wflh_b: { weight: true, height: true },
        wflh_g: { weight: true, height: true },
    });

    const measurementDataExist = useMemo(() => {
        if (!measurementData) {
            return {};
        }
        return {
            weight: measurementData?.some((entry) => entry.dataValues.weight !== undefined),
            headCircumference: measurementData?.some((entry) => entry.dataValues.headCircumference !== undefined),
            height: measurementData?.some((entry) => entry.dataValues.height !== undefined),
        };
    }, [measurementData]);

    const filteredChartData = useMemo(() => {
        if (!chartData) {
            return {};
        }
        const filteredData = Object.entries(chartData).reduce(
            (acc: ChartData, [key, value]: [keyof typeof requiredData, any]) => {
                const requiredMeasurements = requiredData[key];
                if (requiredMeasurements) {
                    const allRequiredMeasurementsExist = Object.entries(requiredMeasurements).every(
                        ([measurementKey, required]: [keyof typeof measurementDataExist, boolean]) =>
                            !required || measurementDataExist[measurementKey],
                    );
                    if (!allRequiredMeasurementsExist) {
                        return acc;
                    }
                }
                acc[key] = value;
                return acc;
            },
            {},
        );

        return filteredData;
    }, [chartData, measurementDataExist, requiredData]);

    return { chartData: filteredChartData };
};
