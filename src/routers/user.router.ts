import { Router } from 'express';
import {
  getUsers,
  getUser,
  loginUser,
  registerUser,
  getUserBookingsController,
} from '../controllers/user.controller';

import verifyToken from '../middleware/authmiddleware';

const router = Router();

router.get('/', getUsers);

router.get('/:user_id', verifyToken, getUser);

router.post('/login', loginUser);

router.post('/register', registerUser);

router.get('/user-bookings/:user_id', verifyToken,  getUserBookingsController);

export default router;
