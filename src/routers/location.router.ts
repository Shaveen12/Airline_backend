import { Router } from 'express';
import { 
    getAllLocationsController,
    addLocationController,
    deleteLocationController,
    getLocationByIDController



 } from '../controllers/location.controller';

  
const router = Router();

router.get('/', getAllLocationsController);
router.post('/addLocation', addLocationController);
router.delete('/deleteLocation/:id',deleteLocationController);
router.get('/getLocationById',getLocationByIDController);
export default router;