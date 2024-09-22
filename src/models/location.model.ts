import db from '../db';

export const getAllLocations = async () => {
    const [rows] = await db.query('SELECT * FROM location');
    return rows;
};

interface LocationData {
    location_id:number,
    name: string;
    parent_id:number
  };
  
export const addLocation = async (locationData: LocationData) => {
    const query = `INSERT INTO location(location_id,name,parent_id) VALUES(?,?,?)`;
    const values = [locationData.location_id, locationData.name, locationData.parent_id];
    const [result] = await db.execute(query, values);
    return result;
};

export const deleteLocaiton = async (id: number) => {
    const query =  `DELETE FROM location WHERE location_id = ?`;
    const [result] = await db.execute(query, [id]);
    return result;
};

export const getLocationByID = async (id:number)=>{
    const [rows] = await db.query(`SELECT name,parent_id FROM location WHERE locaton_id=?`,[id]);
    return rows;
}