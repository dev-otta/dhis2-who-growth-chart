export interface AnnotationLabel {
    display: boolean;
    content?: () => string;
    position?: 'top' | 'bottom' | 'center' | 'start' | 'end';
    yAdjust?: number;
}

interface Annotation {
    display: boolean;
    type: 'line' | 'box' | 'point' | 'range' | 'line-vertical' | 'box-vertical';
    mode?: 'horizontal' | 'vertical' | 'nearest' | 'x' | 'y' | 'index' | 'dataset' | 'average' | 'point';
    scaleID?: string;
    value?: string | number | Date;
    borderWidth?: number;
    label?: AnnotationLabel;
}

export const GrowthChartAnnotations = (xAxisValues: number[]) => {
    const annotations: Annotation[] = [];

    xAxisValues.forEach(
        (label, index) => {
            if (label % 12 === 0 && label !== 0) {
                annotations.push({
                    display: true,
                    type: 'line',
                    mode: 'vertical',
                    scaleID: 'x',
                    borderWidth: 2,
                    value: index,
                    label: {
                        display: true,
                        content: () => {
                            const value = label / 12;
                            if (value === 1) return `${value} Year`;
                            return `${value} Years`;
                        },
                        position: 'start',
                        yAdjust: -10,
                    },

                });
            }
        },
    );
    return annotations;
};
