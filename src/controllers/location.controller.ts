import { Request, Response } from 'express';

import dotenv from 'dotenv';
import {
    getAllLocations,
    getLocationByID,
    addLocation,
    deleteLocaiton,
  
} from '../models/location.model';

dotenv.config();

export const getAllLocationsController = async(req:Request,res:Response)=>{
    try{
        const locations = await getAllLocations();
        res.json(locations);
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve locations');
    }
};

export const addLocationController = async (req:Request,res:Response)=>{
    const locationData = req.body;
    try{
        const result = await addLocation(locationData);
        res.status(201).json({message:'Location added successfully', result});
    }catch(error){
        console.error('Error in adding location',error);
        res.status(500).json({message:'Failed to add location',error});
    }
}

export const deleteLocationController = async (req:Request,res:Response)=>{
    const {id} = req.params;
    try{
        const result = await deleteLocaiton(Number(id));
        res.status(201).json({message:'Location deleted successfully', result});
    }catch(error){
        console.error('Error in deleting location',error);
        res.status(500).json({message:'Failed to delete location',error});
    }
}

export const getLocationByIDController = async (req:Request,res:Response)=>{
    const {id} = req.params;
    try{
        const location = await getLocationByID(Number(id));
        if(location){
            res.json(location);
        }else{
            res.status(404).send('Location not found');
        }
    }catch(err){
        console.error(err);
        res.status(500).send('Failed to retrieve location');
    }
}
