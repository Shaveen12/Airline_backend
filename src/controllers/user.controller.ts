import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import {
  getAllUsers,
  getUserById,
  getUserByEmailAndPassword,
  createUser,
  getUserBookings,
} from '../models/user.model';

dotenv.config();


export const getUser = async (req: Request, res: Response) => {
  const { user_id } = req.params;
//   console.log("Inside get User");

  try {
    const user = await getUserById(Number(user_id));

    if (user) {
      res.json(user);
    } else {
      res.status(404).send('User not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve user');
  }
};

export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
//   console.log("inside login");

  if (!email || !password) {
    return res
      .status(400)
      .send('Missing required parameters: email and password');
  }

  try {
    const user = await getUserByEmailAndPassword(email, password);

    if (user) {
      const secret = process.env.JWT_SECRET;
      if (!secret) {
        throw new Error('JWT_SECRET is not set');
      }

      const token = jwt.sign(
        { user_id: user.user_id, email: user.email },
        secret,
        { expiresIn: '1h' }
      );
      res.json({ token, user });
    } else {
      res.status(401).send('Invalid email or password');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to log in');
  }
};

export const registerUser = async (req: Request, res: Response) => {
  const userData = req.body;

  try {
    const result = await createUser(userData);
    res.status(201).json({ message: 'User added successfully', result });
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ message: 'Failed to add user', error });
  }
};

export const getUserBookingsController = async (req: Request, res: Response) => {
  const { user_id } = req.params;

  try {
    const bookings = await getUserBookings(Number(user_id));
    res.json(bookings);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve user bookings');
  }
};
