import React, { useEffect } from 'react';
import i18n from '@dhis2/d2-i18n';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import { ChartDataTypes } from '../../../types/chartDataTypes';
import { chartLineColorPicker } from '../../../utils/chartLineColorPicker';

Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);

export const GrowthChartBuilder = ({
    dataSetValues, dataSetMetadata, xLabelValues, keysDataSet,
}: ChartDataTypes) => {
    const data = {
        labels: xLabelValues,
        datasets: keysDataSet.map((key) => ({
            data: dataSetValues.map((entry) => entry[key]),
            borderWidth: 0.9,
            borderColor: chartLineColorPicker(key),
            label: key,
        })),
    };

    const options = {
        elements: { point: { radius: 0, hoverRadius: 0 } },
        plugins: { legend: { display: false } },
        scales: {
            x: { title: { display: true, text: i18n.t(`age (${dataSetMetadata.unit})`) } },
            y: { title: { display: true, text: dataSetMetadata.yaxis } },
        },
        layout: { padding: { right: 60 } },
    };

    useEffect(() => {
        Chart.register({
            id: 'custom_draw',
            afterDraw: (chart) => {
                const { ctx } = chart;
                ctx.save();
                ctx.font = `${Chart.defaults.font.size}px ${Chart.defaults.font.family}`;
                ctx.fillStyle = 'red';
                ctx.textBaseline = 'bottom';
                chart.data.datasets.forEach((dataset, index) => {
                    const meta = chart.getDatasetMeta(index);
                    const [lastElement] = meta.data.slice(-1);
                    const { x, y } = lastElement.getProps(['x', 'y']);
                    ctx.fillStyle = typeof dataset.borderColor === 'string' ? dataset.borderColor : 'black';
                    ctx.fillText(dataset.label, x + 10, y);
                });
                ctx.restore();
            },
        });
    }, []);

    return <Line data={data} options={options} />;
};
