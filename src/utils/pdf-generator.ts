import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (element: HTMLElement, fileName: string) => {
  try {
    // Wait for fonts to be ready to avoid fallback fonts in the PDF
    if (typeof window !== 'undefined' && 'fonts' in document) {
      await document.fonts.ready;
    }

    const canvas = await html2canvas(element, {
      scale: 3, // High scale (3x) for super sharp text rendering
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      onclone: (clonedDoc) => {
        // Strip dark mode class to force standard black-on-white theme
        clonedDoc.documentElement.classList.remove('dark');
        clonedDoc.body.classList.remove('dark');

        const clonedElement = clonedDoc.getElementById(element.id);
        if (clonedElement) {
          // Standardize POS layout dimensions and remove shadows/borders for the print
          clonedElement.style.width = '440px';
          clonedElement.style.maxWidth = '440px';
          clonedElement.style.margin = '0px';
          clonedElement.style.padding = '16px';
          clonedElement.style.boxSizing = 'border-box';
          clonedElement.style.border = 'none';
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.color = '#000000';
          clonedElement.style.fontFamily = "'Courier New', Courier, monospace";
        }
      },
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Thermal receipt width is standard 80mm
    const pdfWidth = 80;
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [pdfWidth, pdfHeight],
    });
    
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
