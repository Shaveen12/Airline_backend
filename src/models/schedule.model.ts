import db from '../db';

// Get full future schedule
export const getFullFutureSchedule = async () => {
  const [rows] = await db.query('CALL GetFutureSchedule()');
  return rows;
};

// Get future schedule by route
export const getFutureScheduleByRoute = async (from: string, to: string) => {
  const [rows]: [any[], any] = await db.query('CALL GetFutureScheduleByRoute(?, ?)', [from, to]);
  return rows;
};

// Get future schedule by route and date range
export const getFutureScheduleByRouteAndDateRange = async (
  start: string,
  end: string,
  from: string,
  to: string
) => {
  const query = 'CALL GetFutureScheduleByRouteAndDateRange(?, ?, ?, ?)';
  const [rows]: [any[], any] = await db.query(query, [start, end, from, to]);
  return rows;
};

// Get schedule by ID
export const getScheduleById = async (id: number) => {
  const [rows]: [any[], any] = await db.query(
    'SELECT * FROM schedule WHERE schedule_id = ?',
    [id]
  );
  return rows[0];
};
