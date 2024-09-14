import { Request, Response } from 'express';
import {
  getFullFutureSchedule,
  getFutureScheduleByRoute,
  getFutureScheduleByRouteAndDateRange,
  getScheduleById,
} from '../models/schedule.model';

export const getFullSchedule = async (req: Request, res: Response) => {
  try {
    const rows = await getFullFutureSchedule();
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve schedules');
  }
};

export const getScheduleByRoute = async (req: Request, res: Response) => {
  const { from, to } = req.query;

  if (!from || !to) {
    return res.status(400).send('Missing required query parameters: from and to');
  }

  try {
    const rows = await getFutureScheduleByRoute(from as string, to as string);

    if (rows.length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('No flights found for the given route');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('An error occurred while retrieving the schedule');
  }
};

export const getScheduleByRouteAndDateRange = async (req: Request, res: Response) => {
  const start = (req.query.start as string)?.trim();
  const end = (req.query.end as string)?.trim();
  const from = (req.query.from as string)?.trim();
  const to = (req.query.to as string)?.trim();

  if (!start || !end || !from || !to) {
    return res.status(400).send('Missing required query parameters: start, end, from, and to');
  }

  try {
    const rows = await getFutureScheduleByRouteAndDateRange(start, end, from, to);

    if (rows.length > 0 && rows[0].length > 0) {
      res.json(rows);
    } else {
      res.status(404).send('No flights found for the given route and date range');
    }
  } catch (err) {
    console.error('Error occurred during procedure execution:', err);
    res.status(500).send('An error occurred while retrieving the schedule');
  }
};

export const getSchedule = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const schedule = await getScheduleById(Number(id));

    if (schedule) {
      res.json(schedule);
    } else {
      res.status(404).send('Schedule not found');
    }
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to retrieve schedule');
  }
};
