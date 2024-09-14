import { Router } from 'express';
import {
  getFullSchedule,
  getScheduleByRoute,
  getScheduleByRouteAndDateRange,
  getSchedule,
} from '../controllers/schedule.controller';

const router = Router();

router.get('/full', getFullSchedule);
router.get('/flight/future', getScheduleByRoute);
router.get('/flight/daterange', getScheduleByRouteAndDateRange);
router.get('/flight/:id', getSchedule);

export default router;
