import express from 'express';
import { cvController } from '../controllers/cvController';

const router = express.Router();

// GET / - Get CV URLs
router.get('/', cvController.getCVUrls);

// GET /download/:lang - Download CV by language
router.get('/download/:lang', cvController.downloadCV);

// GET /preview/:lang - Preview CV by language
router.get('/preview/:lang', cvController.previewCV);

export default router;