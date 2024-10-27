import { Request, Response } from "express";
import {
  flightNumberAgeQuery,
  passengerCountForDestinationQuery,
  bookingsByTierQuery,
  flightsFromSourceToDestinationQuery,
  revenueByAircraftModelQuery,
} from "../models/admin.model";

export const report1 = async (req: Request, res: Response) => {
  try {
    const flightNumber = req.query.flightNumber as string;

    if (!flightNumber) {
      return res.status(400).json({
        success: false,
        message: "Flight number is required",
      });
    }

    const report = await flightNumberAgeQuery(flightNumber);

    res.status(200).json({
      success: true,
      message: "Report 1 generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating report 1:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating report 1",
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
        message: "Please provide destinationCode, startDate, and endDate",
      });
    }

    // Call the model method to generate report2
    const report = await passengerCountForDestinationQuery(
      destinationCode,
      startDate,
      endDate
    );

    res.status(200).json({
      success: true,
      message: "Report 2 generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating report 2:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating report 2",
    });
  }
};

export const report3 = async (req: Request, res: Response) => {
  try {
    // Extract start and end dates from request query parameters
    const { startDate, endDate } = req.query;

    // Validate parameters
    if (!startDate || !endDate) {
      return res.status(400).json({
        success: false,
        message: "Please provide both startDate and endDate",
      });
    }

    // Call the model method to get the bookings by tier
    const report = await bookingsByTierQuery(startDate, endDate);

    res.status(200).json({
      success: true,
      message: "Report 3 generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating report 3:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating report 3",
    });
  }
};

export const report4 = async (req: Request, res: Response) => {
  try {
    // Extract source and destination codes from request query parameters
    const { sourceCode, destinationCode } = req.query;

    // Validate parameters
    if (!sourceCode || !destinationCode) {
      return res.status(400).json({
        success: false,
        message: "Please provide both sourceCode and destinationCode",
      });
    }

    // Call the model method with source and destination
    const report = await flightsFromSourceToDestinationQuery(
      sourceCode,
      destinationCode
    );

    res.status(200).json({
      success: true,
      message: "Report 4 generated successfully",
      data: report,
    });
  } catch (error) {
    console.error("Error generating report 4:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating report 4",
    });
  }
};

export const report5 = async (req: Request, res: Response) => {
  try {
    // Call the model method to get revenue by aircraft model
    const report = await revenueByAircraftModelQuery();

    res.status(200).json({
      success: true,
      message: "Report 5 generated successfully",
      data: report,
    });
  } catch (error: any) {
    console.error("Error generating report 5:", error);
    res.status(500).json({
      success: false,
      message: "An error occurred while generating report 5",
      error: error.message, // Include the error message for debugging
    });
  }
};
