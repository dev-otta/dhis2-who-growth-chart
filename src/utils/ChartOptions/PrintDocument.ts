import html2canvas from 'html2canvas';
import JsPDF from 'jspdf';
import { CategoryCodes, ChartData, CategoryToLabel } from '../../types/chartDataTypes';

interface PrintDocumentProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
    gender: string;
}

export const PrintDocument = ({ category, dataset, gender }: PrintDocumentProps) => {
    const datasetPdfLabel = String(dataset).replace(/ /g, '_');
    const input = document.getElementById('divToPrint');
    html2canvas(input, { logging: false })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF('l', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            pdf.text(`Gender: ${gender}`, 20, 20);
            pdf.text(`Category: ${CategoryToLabel[category]}`, 20, 30);
            pdf.text(`Dataset: ${dataset}`, 20, 40);
            pdf.addImage(imgData, 'JPEG', 10, 42, width - 20, height - 40);

            pdf.save(`${category}_${datasetPdfLabel}.pdf`);
        });
};
