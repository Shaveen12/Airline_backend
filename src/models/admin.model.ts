import db from "../db";

export const flightNumberAgeQuery = async (flightNumber: string) => {
  try {
    const adultQuery = `
      SELECT passenger_details.passenger_id, passenger_details.full_name, passenger_details.gender, passenger_details.D_O_B, passenger_details.passport_number, passenger_details.flight_count, passenger_details.tier
      FROM booking 
      LEFT JOIN passenger_details ON passenger_details.passenger_id = booking.passenger_id
      LEFT JOIN schedule ON schedule.schedule_id = booking.schedule_id
      WHERE schedule.flight_number = ? AND get_passenger_age(passenger_details.passenger_id) >= 18;
    `;

    const childQuery = `
      SELECT passenger_details.passenger_id, passenger_details.full_name, passenger_details.gender, passenger_details.D_O_B, passenger_details.passport_number, passenger_details.flight_count, passenger_details.tier
      FROM booking 
      LEFT JOIN passenger_details ON passenger_details.passenger_id = booking.passenger_id
      LEFT JOIN schedule ON schedule.schedule_id = booking.schedule_id
      WHERE schedule.flight_number = ? AND get_passenger_age(passenger_details.passenger_id) < 18;
    `;

    // Execute both queries in parallel
    const [adultResult, childResult] = await Promise.all([
      db.query(adultQuery, [flightNumber]),
      db.query(childQuery, [flightNumber]),
    ]);

    // console.log("Adult Query: ", adultResult)
    // console.log("Child Query: ", childResult)

    return {
      flightNumber,
      adult: adultResult[0],
      child: childResult[0],
    };
  } catch (error) {
    console.error("Error in flightNumberAgeQuery:", error);
    throw error;
  }
};

export const passengerCountForDestinationQuery = async (
  destinationCode: any,
  startDate: any,
  endDate: any
) => {
  try {
    const passengerCountQuery = `
        SELECT COUNT(DISTINCT booking.passenger_id) AS no_of_passengers
        FROM booking 
        JOIN schedule ON booking.schedule_id = schedule.schedule_id 
        JOIN route ON schedule.route_id = route.route_id
        WHERE route.destination_code = ? 
        AND schedule.departure_time BETWEEN ? AND ?;
      `;

    // Execute the query with the provided parameters
    const [result]: [any[], any] = await db.query(passengerCountQuery, [
      destinationCode,
      startDate,
      endDate,
    ]);

    return {
      destinationCode,
      startDate,
      endDate,
      no_of_passengers: result[0]?.no_of_passengers || 0,
    };
  } catch (error) {
    console.error("Error in passengerCountForDestinationQuery:", error);
    throw error;
  }
};

export const bookingsByTierQuery = async (startDate: any, endDate: any) => {
  try {
    const tierBookingsQuery = `
        SELECT passenger_details.tier, COUNT(booking.booking_id) AS no_of_bookings
        FROM booking 
        JOIN passenger_details ON booking.passenger_id = passenger_details.passenger_id 
        JOIN schedule ON booking.schedule_id = schedule.schedule_id
        WHERE schedule.departure_time BETWEEN ? AND ?
        GROUP BY passenger_details.tier;
      `;

    // Execute the query with the date range as parameters
    const [result] = await db.query(tierBookingsQuery, [startDate, endDate]);

    return result;
  } catch (error) {
    console.error("Error in bookingsByTierQuery:", error);
    throw error;
  }
};
