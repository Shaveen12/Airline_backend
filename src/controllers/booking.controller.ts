import { Request, Response } from 'express';
import {
  getAvailableSeats,
  addReservation,
  addBooking,
} from '../models/booking.model';

export const getSeats = async (req: Request, res: Response) => {
  const { schedule_id, ticket_type } = req.query;

  if (!schedule_id || !ticket_type) {
    return res.status(400).json({ message: 'Missing required query parameters: schedule_id and ticket_type' });
  }

  try {
    const rows = await getAvailableSeats(Number(schedule_id), ticket_type as string);

    if (Array.isArray(rows) && Array.isArray(rows[0])) {
      const seatNumbers = rows[0].map((row: any) => row.seat_number);
      res.status(200).json(seatNumbers);
    } else {
      res.status(500).json({ message: 'Unexpected result format from database.' });
    }
  } catch (error: any) {
    console.error('Error getting available seats:', error);
    res.status(500).json({ message: 'Failed to get available seats', error: error.message });
  }
};

export const createReservation = async (req: Request, res: Response) => {
  const { schedule_id, ticket_type, seat_no } = req.body;

  if (!schedule_id || !ticket_type || !seat_no) {
    return res.status(400).json({ message: 'Missing required parameters in request body' });
  }

  try {
    const result = await addReservation(schedule_id, ticket_type, seat_no);
    res.status(201).json({ message: 'Reservation added successfully', result });
  } catch (error: any) {
    if (error.sqlState === '45000') {
      res.status(400).json({ message: 'Seat not available or already reserved' });
    } else {
      console.error('Error adding reservation:', error);
      res.status(500).json({ message: 'Failed to add reservation', error: error.message });
    }
  }
};

export const createBooking = async (req: Request, res: Response) => {
  const bookingData = req.body;

  // Validate required fields
  const requiredFields = ['schedule_id', 'ticket_type', 'seat_no', 'first_name', 'last_name', 'dob', 'gender', 'passport_number', 'address', 'state', 'country'];

  const missingFields = requiredFields.filter(field => !bookingData[field]);

  if (missingFields.length > 0) {
    return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
  }

  try {
    const result = await addBooking(bookingData);
    res.status(201).json({ message: 'Booking added successfully', result });
  } catch (error: any) {
    if (error.sqlState === '45000') {
      res.status(400).json({ message: 'Seat number is not reserved or does not exist.' });
    } else {
      console.error('Error adding booking:', error);
      res.status(500).json({ message: 'Failed to add booking', error: error.message });
    }
  }
};
