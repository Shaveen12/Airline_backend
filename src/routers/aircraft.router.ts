import { Router } from 'express';
import {
    getAircrafts,
    getAircraftByIDInController,
    createAirCraftInController,
    updateServiceDatesController,


  } from '../controllers/aircraft.controller';

  
const router = Router();

router.get('/', getAircrafts);
router.get('/:aircraft_id', getAircraftByIDInController);
router.post('/addAircraft', createAirCraftInController);
router.patch('/changeServiceDate',updateServiceDatesController);
export default router;
