import { Router } from 'express';
import {
   getAllAirportsController,
    addAirportController,
    getAirportNameByLocation_idController


  } from '../controllers/code.controller';

  
const router = Router();

router.get('/', getAllAirportsController);
router.post('/addAirport', addAirportController);
router.get('/getAirportNameByLocation_id/:location_id', getAirportNameByLocation_idController);

export default router;
