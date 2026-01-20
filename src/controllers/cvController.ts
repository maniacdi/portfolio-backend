
import { Request, Response } from 'express';

interface CVData {
  es: string;
  en: string;
}

const CV_URLS: CVData = {
  es: 'https://res.cloudinary.com/dblcttl2g/image/upload/v1768944549/CV_JavierGarciaMagaldi_dhoeny.pdf',
  en: 'https://res.cloudinary.com/dblcttl2g/image/upload/v1768944548/CV_JavierGarcia_enupah.pdf'
};

export const cvController = {
  getCVUrls: (req: Request, res: Response) => {
    res.json({
      success: true,
      data: CV_URLS
    });
  },

  downloadCV: (req: Request, res: Response) => {
    const { lang } = req.params;
    const cvUrl = CV_URLS[lang as keyof CVData];

    if (!cvUrl) {
      return res.status(400).json({
        success: false,
        error: 'Idioma no válido. Use "es" o "en"'
      });
    }

    res.redirect(cvUrl);
  },

  previewCV: (req: Request, res: Response) => {
    const { lang } = req.params;
    const cvUrl = CV_URLS[lang as keyof CVData];

    if (!cvUrl) {
      return res.status(400).json({
        success: false,
        error: 'Idioma no válido'
      });
    }

    res.json({
      success: true,
      url: cvUrl,
      lang
    });
  }
};