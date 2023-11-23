import { Service, Inject } from 'typedi';

import { Floor } from '../domain/floor'; 
import { FloorId } from '../domain/floorId';
import { FloorMap } from '../mappers/FloorMap'; 

import { Document, FilterQuery, IfAny, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence'; 
import IFloorRepo from './IRepos/IFloorRepo'; 
import IFloorDTO from '../dto/IFloorDTO';
import { ObjectId } from 'mongodb';
import { floor } from 'lodash';

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;
  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>, 
  ) {}
  async findByBuildingId(buildingId: string): Promise<IFloorDTO[]> {
    try {
      const query = { building: buildingId };
      const floorsFromDB = await this.floorSchema.find(query as FilterQuery<IFloorPersistence & Document>) as IFloorDTO[];
      return floorsFromDB;
    } catch (error) {
      console.error("Error fetching floors:", error);
      throw error;
    }
  }

  async findAll(): Promise<IFloorDTO[]> {
    try {
      const floor = await this.floorSchema.find() as IFloorDTO[];
      return floor;
    } catch (error) {
      throw error;
    }
  }
  
  public async save (floor: Floor): Promise<Floor> {
    let floorDocument = null;
    if(ObjectId.isValid(floor.id.toString())){
      const query = { _id: floor.id };
      floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    }

    try {
      if(floorDocument === null){
        const rawFloor = FloorMap.toPersistence(floor);
        const floorCreated = await this.floorSchema.create(rawFloor) as unknown as IFloorDTO;
        return FloorMap.toDomain(floorCreated);
      } else {
        floorDocument.name = floor.name;
        floorDocument.description = floor.description;
        floorDocument.hall = floor.hall;
        floorDocument.room = floor.room;
        floorDocument.floorMap = floor.floorMap;
        floorDocument.hasElevator = floor.hasElevator;
        floorDocument.passages = floor.passages;
        await floorDocument.save();

        return floor;
      } 
    } catch (err) {
      throw err;
    }
  }

  public async exists (floor: Floor): Promise<boolean> {
    const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue : floor.id;
    const query = {id: idX};
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
    return !!floorDocument === true;
  }
  
  public async findByID(floorId: FloorId | string): Promise<Floor> {
    const query = { _id: floorId };
    const floor = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>) as IFloorDTO;

    if (floor != null) {
      return FloorMap.toDomain(floor);
    } else {
      return null;
    }
  }
}