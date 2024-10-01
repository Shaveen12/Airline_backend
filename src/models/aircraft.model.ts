import db from '../db';


export const getAllAircrafts = async ()=> {
    const [rows] = await db.query('SELECT * FROM aircraft');
    return rows;
  };
  
export const getAircraftByID = async(id:string) => {
    const [rows] : [any[],any] = await db.query('SELECT  brand,Model,economy_seats,business_seats,platinum_seats,next_service_date,last_service_date,purchase_date,manufactured_date FROM aircraft WHERE Aircraft_id =?',
        [id]
    );
    return rows[0];
};

export const createAircraft = async (aircraftData:any)=>{
    const query = `INSERT INTO Aircraft (brand,Model,economy_seats,business_seats,platinum_seats,next_service_date,last_service_date,purchase_date,manufactured_date) VALUES (?,?,?,?,?,?,?,?,?)`;
    
    const today = new Date();
    const oneMonthLater = new Date(today.setMonth(today.getMonth() + 1));
    const values = [
        aircraftData.brand,
        aircraftData.Model,
        aircraftData.economy_seats,
        aircraftData.business_seats,
        aircraftData.platinum_seats,
        today,//aircraftData.next_service_date,
        oneMonthLater,//aircraftData.last_service_date,
        aircraftData.purchase_date,
        aircraftData.manufactured_date
    ];

    const [result] = await db.execute(query,values);
    return result;
};

export const updateServiceDates = async (id:String)=>{
    const query = ' UPDATE Aircraft SET next_service_date = ?, last_service_date = ? WHERE Aircraft_id = ?';
    const today = new Date();
    const nextServiceDate= new Date(today.setMonth(today.getMonth()+1));
    const values=[id,today,nextServiceDate];

    const [result] = await db.execute(query,values);
    return result;
}