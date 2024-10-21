// report.model.ts
import { RowDataPacket } from 'mysql2/promise';
import db from '../db';  // Assuming `db` is a MySQL connection pool instance

// Query for passengers above 18 years old
export const getPassengersAbove18 = async (): Promise<RowDataPacket[]> => {
  const query = `
    SELECT b.first_name FROM booking b WHERE TIMESTAMPDIFF(YEAR, dob, CURDATE()) > 18;
  `;
  const [rows] = await db.query<RowDataPacket[]>(query);
  return rows;
};

// Query for passengers by destination
export const getPassengersByDestination = async (startDate: string, endDate: string, destination: string): Promise<RowDataPacket[]> => {
  const query = `
    SELECT b.first_name
    FROM booking b
    JOIN schedule s ON b.schedule_id = s.schedule_id
    WHERE s.destination_airport_code = ? 
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [destination, startDate, endDate]);
  return rows;
};

// Query for bookings by user type (based on user email)
export const getBookingsByType = async (userEmail: string, startDate: string, endDate: string): Promise<RowDataPacket[]> => {
  const query = `
    SELECT b.booking_id, b.date, b.first_name
    FROM booking b
    WHERE b.ticket_type = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [userEmail, startDate, endDate]);
  return rows;
};

// Query for flights by route
export const getFlightsByRoute = async (origin: string, destination: string, startDate: string, endDate: string): Promise<RowDataPacket[]> => {
  const query = `
    SELECT a.brand , a.model 
	FROM aircraft a
    JOIN schedule s ON s.aircraft_id = a.aircraft_id
	WHERE source_airport_code = ? AND destination_airport_code = ?
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [origin, destination, startDate, endDate]);
  return rows;
};

// Query for revenue by aircraft
export const getRevenueByAircraft = async (startDate: string, endDate: string): Promise<RowDataPacket[]> => {
  const query = `
    SELECT a.aircraft_model, SUM(b.price) AS total_revenue
    FROM bookings b
    JOIN flight f ON b.flight_number = f.flight_number
    JOIN aircraft a ON f.aircraft_id = a.aircraft_id
    WHERE f.departure_time BETWEEN ? AND ?
    GROUP BY a.aircraft_model;
  `;
  const [rows] = await db.query<RowDataPacket[]>(query, [startDate, endDate]);
  return rows;
};
