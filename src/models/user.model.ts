import db from '../db';

export const getAllUsers = async () => {
  const [rows] = await db.query('SELECT * FROM user');
  return rows;
};

export const getUserById = async (id: number) => {
  const [rows]: [any[], any] = await db.query(
    `SELECT email, first_name, last_name, dob, gender, passport_number, address, state, country
     FROM user WHERE user_id = ?`,
    [id]
  );
  return rows[0];
};

export const getUserByEmailAndPassword = async (email: string, password: string) => {
  const [rows]: [any[], any] = await db.query(
    `SELECT user_id, email, first_name, last_name, gender, dob, passport_number, address, state, country, passport_number
     FROM user WHERE email = ? AND password = ?`,
    [email, password]
  );
  return rows[0];
};

export const createUser = async (userData: any) => {
  const query = `
    INSERT INTO User (email, password, first_name, last_name, dob, passport_number, flight_count, tier, gender, address, state, country)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    userData.email,
    userData.password,
    userData.first_name,
    userData.last_name,
    userData.dob,
    userData.passport_number,
    0, // flight_count
    userData.tier,
    userData.gender,
    userData.address,
    userData.state,
    userData.country,
  ];

  const [result] = await db.execute(query, values);
  return result;
};

export const getUserBookings = async (user_id: number) => {
  const [rows] = await db.query(
    `SELECT source_airport_code, destination_airport_code, flight_no, date_time, ticket_type, price
     FROM booking
     JOIN schedule ON booking.schedule_id = schedule.schedule_id
     WHERE booking.user_id = ?`,
    [user_id]
  );
  return rows;
};
