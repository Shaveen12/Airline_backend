import { Request, Response } from 'express';

import dotenv from 'dotenv';
import {
    getAllAircrafts,
    getAircraftByID,
    createAircraft,
    updateServiceDates,

  } from '../models/aircraft.model';

dotenv.config();

export const getAircrafts = async (req: Request, res: Response)=> {
    try{
        const aircrafts = await getAllAircrafts();
        res.json(aircrafts);
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve aircrafts');
    }
};

export const getAircraftByIDInController = async (req:Request, res: Response)=>{
    const{id} = req.params;

    try{
        const aircraft =  await getAircraftByID(String(id));
        if(aircraft){
            res.json(aircraft);
        }else{
            res.status(404).send('Aircraft not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve aircraft');
    }
};

export const createAirCraftInController = async (req:Request, res:Response)=>{
    const aircraftData = req.body;
    try{
        const result = await createAircraft(aircraftData);
        res.status(201).json({message:'Aircraft added to logs successfully', result});
    }catch(error){
        console.error('Error in adding aircraft',error);
        res.status(500).json({message:'Failed to add aircraft',error});
    }
};

export const updateServiceDatesController =async(req:Request,res:Response)=>{
    const {id}=req.params;
    
    try{
        const updateDates = await updateServiceDates(String(id));
        res.json(updateDates);
    }catch (error){
        console.error('Error in updating service dates',error);
        res.status(500).json({message:'Failed to update service dates',error});
    }
};