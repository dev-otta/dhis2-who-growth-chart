import { Animation, Chart } from 'chart.js';

interface DataSet {
    data: number[];
    borderWidth: number;
    borderColor: string;
    label: string;
}

export const AnnotateLineEnd = (animation: Animation & { chart?: Chart }) => {
    const { chart } = animation;
    if (!chart) return;

    const { ctx } = chart;

    const labelsToInclude = ['SD0', 'SD1', 'SD2', 'SD3', 'SD1neg', 'SD2neg', 'SD3neg'];

    const ZscoreLines = chart.data.datasets.filter((dataset: DataSet) => labelsToInclude.includes(dataset.label));

    const extractNumberFromLabel = (label: string): number => {
        const numberStr = label.replace(/[^\d.-]/g, '');
        return parseFloat(numberStr);
    };

    const adjustLabel = (labelText: number, originalLabel: string): string => {
        const isNegative = originalLabel.includes('neg');
        if (isNegative) return `-${labelText}`;
        return ` ${labelText.toString()}`;
    };

    const drawText = (ctx: CanvasRenderingContext2D, text: string, x: number, y: number, color: string) => {
        ctx.fillStyle = color;
        ctx.font = '14px Arial';
        ctx.fillText(text, x, y);
    };

    ZscoreLines.forEach((dataset: DataSet, index: number) => {
        const meta = chart.getDatasetMeta(index);
        const [lastElement] = meta.data.slice(-1);
        const { x, y } = lastElement.getProps(['x', 'y']);

        const labelText = extractNumberFromLabel(dataset.label);
        const adjustedLabelText = adjustLabel(labelText, dataset.label);

        drawText(ctx, adjustedLabelText, x + 3, y + 4, dataset.borderColor);
    });
};
