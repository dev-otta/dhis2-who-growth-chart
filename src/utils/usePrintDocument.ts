import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { CategoryCodes, ChartData } from '../types/chartDataTypes';

interface PrintDocumentProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
}

export const usePrintDocument = ({ category, dataset }: PrintDocumentProps) => {
    const input = document.getElementById('divToPrint');
    html2canvas(input, { logging: false })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF('l', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            pdf.text(`Category: ${category}`, 20, 20);
            pdf.text(`Dataset: ${dataset}`, 20, 30);
            pdf.addImage(imgData, 'JPEG', 10, 32, width - 20, height - 30);

            pdf.save(`${category}_${dataset}.pdf`);
        });
};
