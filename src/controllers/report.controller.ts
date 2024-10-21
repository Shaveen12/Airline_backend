// report.controller.ts
import { Request, Response } from 'express';
import { getPassengersAbove18, getPassengersByDestination, getBookingsByType, getFlightsByRoute, getRevenueByAircraft } from '../models/report.model';

interface ReportRequest extends Request {
  body: {
    reportType: string;
    startDate?: string;
    endDate?: string;
    origin?: string;
    destination?: string;
    email?: string;
  };
}

// Controller for generating reports
export const generateReport = async (req: ReportRequest, res: Response) => {
  const { reportType, startDate, endDate, origin, destination, email } = req.body;
  
  try {
    let reportData: any;
    
    switch (reportType) {
      case 'passengers_above_18_years':
        reportData = await getPassengersAbove18();
        break;
      case 'passengers_by_destination':
        reportData = await getPassengersByDestination(startDate as string, endDate as string, destination as string);
        break;
      case 'bookings_by_type':
        reportData = await getBookingsByType(email as string, startDate as string, endDate as string);
        break;
      case 'flights_by_route':
        reportData = await getFlightsByRoute(origin as string, destination as string, startDate as string, endDate as string);
        break;
      case 'revenue_by_aircraft':
        reportData = await getRevenueByAircraft(startDate as string, endDate as string);
        break;
      default:
        return res.status(400).json({ error: 'Invalid report type' });
    }

    res.status(200).json(reportData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate report' });
  }
};
