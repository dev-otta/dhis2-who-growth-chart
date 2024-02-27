import { Animation, Chart } from 'chart.js';

interface DataSet {
    data: number[];
    borderWidth: number;
    borderColor: string;
    label: string;
}

export const annotateLineEnd = (animation: Animation & { chart?: Chart }) => {
    const { chart } = animation;
    if (!chart) return;

    const { ctx } = chart;

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

    chart.data.datasets.forEach((dataset: DataSet, index: number) => {
        const meta = chart.getDatasetMeta(index);
        const [lastElement] = meta.data.slice(-1);
        const { x, y } = lastElement.getProps(['x', 'y']);

        const labelText = extractNumberFromLabel(dataset.label);
        const adjustedLabelText = adjustLabel(labelText, dataset.label);

        drawText(ctx, adjustedLabelText, x + 3, y + 4, dataset.borderColor);
    });
};
