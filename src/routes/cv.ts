import express from 'express';
import { cvController } from '../controllers/cvController';

const router = express.Router();

router.get('/', cvController.getCVUrls);

router.get('/download/:lang', cvController.downloadCV);

router.get('/preview/:lang', cvController.previewCV);

export default router;