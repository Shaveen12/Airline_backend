// report.router.ts
import express from 'express';
import { generateReport } from '../controllers/report.controller';

const router = express.Router();

// Endpoint to generate reports
router.post('/report', generateReport);

export default router;
