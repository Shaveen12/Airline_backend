import db from '../db';

// Get available seats
export const getAvailableSeats = async (schedule_id: number, ticket_type: string) => {
  const query = `CALL GetAvailableSeats(?, ?)`;
  const [rows]: [any[], any] = await db.execute(query, [schedule_id, ticket_type]);
  return rows;
};

// Add a reservation
export const addReservation = async (schedule_id: number, ticket_type: string, seat_no: number) => {
  const query = `CALL AddReservation(?, ?, ?)`;
  const [result] = await db.execute(query, [schedule_id, ticket_type, seat_no]);
  return result;
};

// Add a booking
export const addBooking = async (bookingData: any) => {
  const query = `CALL AddBooking(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    bookingData.schedule_id ?? null,
    bookingData.user_id ?? null,
    bookingData.date ?? null,
    bookingData.ticket_type ?? null,
    bookingData.seat_no ?? null,
    bookingData.first_name ?? null,
    bookingData.last_name ?? null,
    bookingData.dob ?? null,
    bookingData.gender ?? null,
    bookingData.passport_number ?? null,
    bookingData.address ?? null,
    bookingData.state ?? null,
    bookingData.country ?? null,
  ];
  const [result] = await db.execute(query, params);
  return result;
};
