import { Request, Response } from 'express';
import { flightNumberAgeQuery, passengerCountForDestinationQuery} from '../models/admin.model';

export const report1 = async (req: Request, res: Response) => {
  try {
    const flightNumber = req.query.flightNumber as string;
    
    if (!flightNumber) {
      return res.status(400).json({
        success: false,
        message: 'Flight number is required'
      });
    }

    const report = await flightNumberAgeQuery(flightNumber);

    res.status(200).json({
      success: true,
      message: 'Report 1 generated successfully',
      data: report
    });
  } catch (error) {
    console.error('Error generating report 1:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while generating report 1'
    });
  }
};

export const report2 = async (req: Request, res: Response) => {
    try {
      // Extract parameters from request query or body
      const { destinationCode, startDate, endDate } = req.query;
  
      if (!destinationCode || !startDate || !endDate) {
        return res.status(400).json({
          success: false,
          message: 'Please provide destinationCode, startDate, and endDate',
        });
      }
  
      // Call the model method to generate report2
      const report = await passengerCountForDestinationQuery(destinationCode, startDate, endDate);
  
      res.status(200).json({
        success: true,
        message: 'Report 2 generated successfully',
        data: report,
      });
    } catch (error) {
      console.error('Error generating report 2:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while generating report 2',
      });
    }
  };
  

export const report3 = async (req: Request, res: Response) => {
  try {
    // TODO: Call the appropriate model method to generate report3
    // const report = await SomeModel.generateReport3(req.body);

    res.status(200).json({
      success: true,
      message: 'Report 3 generated successfully',
      // data: report
    });
  } catch (error) {
    console.error('Error generating report 3:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while generating report 3'
    });
  }
};

export const report4 = async (req: Request, res: Response) => {
  try {
    // TODO: Call the appropriate model method to generate report4
    // const report = await SomeModel.generateReport4(req.body);

    res.status(200).json({
      success: true,
      message: 'Report 4 generated successfully',
      // data: report
    });
  } catch (error) {
    console.error('Error generating report 4:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while generating report 4'
    });
  }
};

export const report5 = async (req: Request, res: Response) => {
    try {
      // TODO: Call the appropriate model method to generate report4
      // const report = await SomeModel.generateReport4(req.body);
  
      res.status(200).json({
        success: true,
        message: 'Report 4 generated successfully',
        // data: report
      });
    } catch (error) {
      console.error('Error generating report 4:', error);
      res.status(500).json({
        success: false,
        message: 'An error occurred while generating report 4'
      });
    }
  };
  
