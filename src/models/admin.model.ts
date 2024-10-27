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
