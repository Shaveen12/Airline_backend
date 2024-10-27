import { Router } from 'express';
import {
  report1,
  report2,
  report3,
  report4
} from '../controllers/admin.controller';

const router = Router();

router.get('/report1', report1);
router.get('/report2', report2);
router.get('/report2', report3);
router.get('/report4', report4);

export default router;
 