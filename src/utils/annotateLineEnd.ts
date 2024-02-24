import { Animation, Chart } from 'chart.js';

interface DataSet {
    data: number[];
    borderWidth: number;
    borderColor: string;
    label: string;
}

export const annotateLineEnd = (animation: Animation & { chart?: Chart }) => {
    const { chart } = animation;
    if (!chart) {
        return;
    }
    const { ctx } = chart;

    chart.data.datasets.forEach((dataset: DataSet, index: number) => {
        const meta = chart.getDatasetMeta(index);
        const [lastElement] = meta.data.slice(-1);
        const { x, y } = lastElement.getProps(['x', 'y']);
        ctx.fillStyle = dataset.borderColor;
        ctx.font = '14px Arial';
        ctx.fillText(dataset.label, x + 10, y);
    });
};
