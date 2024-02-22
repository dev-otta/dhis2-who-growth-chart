interface AnnotationLabel {
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
    label?: AnnotationLabel;
}

export const GrowthChartAnnotations = (xLabelValues: number[]) => {
    const annotations: Annotation[] = [];

    xLabelValues.forEach((label, index) => {
        if (label % 12 === 0 && label != 0) {

            annotations.push({
                display: true,
                type: 'line',
                mode: 'vertical',
                scaleID: 'x',
                value: label,
                label: {
                    display: true,
                    content: () => {
                        const value = index / 12
                        if(value == 1) return value + ' Year'
                        return value + ' Years'
                    },
                    position: 'start',
                    yAdjust: -10,
                },
                
            })
        }
    });

    return annotations
}