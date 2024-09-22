import { Request, Response } from 'express';

import dotenv from 'dotenv';
import {
    getAllAirports,
    addAirport,
    getAirportNameByLocation_id
} from '../models/code.model';

dotenv.config();

export const getAllAirportsController = async(req:Request,res:Response)=>{
    try{
        const airports = await getAllAirports();
        res.json(airports);
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve airports');
    }
};

export const addAirportController = async(req:Request,res:Response)=>{
    try{
        const airportData = req.body;
        const result = await addAirport(airportData);
        res.status(201).json({message:'Airport added successfully', result});
    }catch(error){
        console.error('Error in adding airport',error);
        res.status(500).json({message:'Failed to add airport',error});
    }
};

export const getAirportNameByLocation_idController = async(req:Request,res:Response)=>{
    const {location_id} = req.params;
    try{
        const airport = await getAirportNameByLocation_id(Number(location_id));
        if(airport){
            res.json(airport);
        }else{
            res.status(404).send('Airport not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve airport');
    }
};
