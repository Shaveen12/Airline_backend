import db from '../db';

import {addLocation} from './location.model';
export const getAllAirports = async()=>{
    const [rows] = await db.query('SELECT * FROM code');
    return rows;
};
interface AirportData {
    airport_code:number,
    name: string,
    location_id:number,
    parent_id:number
  }
  interface locationData{
    location_id:number,
    name: string,
    parent_id:number
}
export const addAirport = async(airportData:AirportData)=>{
    //first create such a location in location table
    const locationDataNew: locationData = {
        location_id: airportData.location_id,
        name: airportData.name,
        parent_id: airportData.parent_id,
      };
  
      await addLocation(locationDataNew);
    
    
    //then add the airport code to the code table
    const query2 = `INSERT INTO code(airport_code,location_id) VALUES(?,?)`;
    const values2 = [airportData.airport_code,airportData.location_id];
    const [result2] = await db.execute(query2,values2);
    return result2;
};

export const getAirportNameByLocation_id = async(location_id:number)=>{
    const query = `SELECT GenerateAirportName(?)`;
    const [rows] : [any[],any]=await db.query(query,[location_id]);
    return rows;

};
/*
sql function to generate airport name recursively
DELIMITER //

CREATE FUNCTION GetAirportName(location_id INT)
RETURNS VARCHAR(20)
DETERMINISTIC
BEGIN
    DECLARE airport_name VARCHAR(20);
    
    -- Get the name of the current location
    SELECT name INTO airport_name FROM Location WHERE Location_id = location_id;

    -- If there's a parent, recursively get the parent name
    IF (SELECT parent_id FROM Location WHERE Location_id = location_id) IS NOT NULL THEN
        SET airport_name = CONCAT(GetAirportName((SELECT parent_id FROM Location WHERE Location_id = location_id)), ' -> ', airport_name);
    END IF;

    RETURN airport_name;
END //

DELIMITER ;
 */