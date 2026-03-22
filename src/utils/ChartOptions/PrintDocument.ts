import html2canvas from 'html2canvas';
import i18n from '@dhis2/d2-i18n';
import JsPDF from 'jspdf';
import { CategoryCodes, ChartData, CategoryToLabel } from '../../types/chartDataTypes';

const nonEmpty = (value: string | undefined): value is string =>
    value != null && String(value).trim() !== '';

interface PrintDocumentProps {
    category: keyof typeof CategoryCodes;
    dataset: keyof ChartData;
    gender: string;
    firstName?: string;
    lastName?: string;
}

export const PrintDocument = ({
    category,
    dataset,
    gender,
    firstName,
    lastName,
}: PrintDocumentProps) => {
    const datasetPdfLabel = String(dataset ?? '').replace(/ /g, '_');
    const input = document.getElementById('divToPrint');
    html2canvas(input, { logging: false })
        .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new JsPDF('l', 'mm', 'a4');
            const width = pdf.internal.pageSize.getWidth();
            const height = pdf.internal.pageSize.getHeight();

            const nameLine = [firstName, lastName].filter(nonEmpty).join(' ');
            const subtitleParts = [
                nonEmpty(gender) ? i18n.t(gender) : '',
                CategoryToLabel[category] ?? '',
                dataset != null ? String(dataset) : '',
            ].filter(nonEmpty);

            pdf.setFontSize(18);
            if (nameLine) {
                pdf.text(nameLine, 20, 20);
                pdf.setFontSize(14);
            }
            pdf.text(subtitleParts.join(' - '), 20, 30);
            pdf.addImage(imgData, 'JPEG', 10, 35, width - 20, height - 40);

            const saveNamePrefix = nonEmpty(lastName)
                ? `${lastName}_${category}_${datasetPdfLabel}`
                : `${category}_${datasetPdfLabel}`;
            pdf.save(`${saveNamePrefix}.pdf`);
        });
};
