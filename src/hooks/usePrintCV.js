import { useEffect } from 'react';

const CV_PATH = '/attachments/Rhys-Evans-CV.pdf';

export default function usePrintCV() {
  useEffect(() => {
    const handleKeyDown = (e) => {
      const isPrintShortcut = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'p';
      if (!isPrintShortcut) return;
      e.preventDefault();

      let iframe = document.getElementById('cv-print-frame');
      if (!iframe) {
        iframe = document.createElement('iframe');
        iframe.id = 'cv-print-frame';
        iframe.style.position = 'fixed';
        iframe.style.right = '0';
        iframe.style.bottom = '0';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = 'none';
        document.body.appendChild(iframe);
      }

      const triggerPrint = () => {
        iframe.contentWindow.focus();
        iframe.contentWindow.print();
      };

      if (iframe.src.endsWith(CV_PATH)) {
        triggerPrint();
      } else {
        iframe.onload = triggerPrint;
        iframe.src = CV_PATH;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);
}
