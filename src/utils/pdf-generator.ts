import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

export const generatePDF = async (element: HTMLElement, fileName: string) => {
  try {
    // Wait for fonts to be ready to avoid fallback fonts in the PDF
    if (typeof window !== 'undefined' && 'fonts' in document) {
      await document.fonts.ready;
    }

    const scaleFactor = 3; // Keep high scale for razor-sharp rendering

    const canvas = await html2canvas(element, {
      scale: scaleFactor,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: 520, // Force canvas width to exactly match the receipt paper width
      windowWidth: 520, // Set iframe window width to avoid margins
      onclone: (clonedDoc) => {
        // Strip dark mode class to force standard black-on-white theme
        clonedDoc.documentElement.classList.remove('dark');
        clonedDoc.body.classList.remove('dark');

        // Reset root elements
        clonedDoc.documentElement.style.margin = '0px';
        clonedDoc.documentElement.style.padding = '0px';
        clonedDoc.documentElement.style.width = 'auto';
        clonedDoc.documentElement.style.height = 'auto';
        clonedDoc.body.style.margin = '0px';
        clonedDoc.body.style.padding = '0px';
        clonedDoc.body.style.width = 'auto';
        clonedDoc.body.style.height = 'auto';

        const clonedElement = clonedDoc.getElementById(element.id);
        if (clonedElement) {
          // Standardize POS layout dimensions and remove shadows/borders for the print
          clonedElement.style.width = '520px';
          clonedElement.style.maxWidth = '520px';
          clonedElement.style.margin = '0px';
          clonedElement.style.padding = '24px'; // Match padding in globals.css
          clonedElement.style.boxSizing = 'border-box';
          clonedElement.style.border = 'none';
          clonedElement.style.boxShadow = 'none';
          clonedElement.style.backgroundColor = '#ffffff';
          clonedElement.style.color = '#000000';
          clonedElement.style.fontFamily = "'Courier New', Courier, monospace";

          // Reset all parent layouts up the tree to be plain block flow
          let parent = clonedElement.parentElement;
          while (parent) {
            parent.style.margin = '0px';
            parent.style.padding = '0px';
            parent.style.display = 'block';
            parent.style.width = 'auto';
            parent.style.height = 'auto';
            parent.style.minHeight = '0px';
            parent.style.backgroundColor = '#ffffff';
            parent = parent.parentElement;
          }
        }
      },
    });
    
    const imgData = canvas.toDataURL('image/png');
    
    // Calculate page dimensions in points (pt) based on actual canvas size
    const pdfWidth = canvas.width / scaleFactor;
    const pdfHeight = canvas.height / scaleFactor;

    // Traditional jsPDF constructor with explicit custom dimensions in points
    // This resolves standard gotchas that default to A4 size
    const pdf = new jsPDF('p', 'pt', [pdfWidth, pdfHeight]);
    
    // Render high-res image spanning the full page width and height with zero margins
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(`${fileName}.pdf`);
  } catch (error) {
    console.error('Error generating PDF:', error);
  }
};
