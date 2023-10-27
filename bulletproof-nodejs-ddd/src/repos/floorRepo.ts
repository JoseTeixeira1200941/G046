import { Service, Inject } from 'typedi';

import { Floor } from '../domain/floor'; 
import { FloorId } from '../domain/floorId';
import { FloorMap } from '../mappers/FloorMap'; 

import { Document, FilterQuery, Model } from 'mongoose';
import { IFloorPersistence } from '../dataschema/IFloorPersistence'; 
import IFloorRepo from '../services/IRepos/IFloorRepo'; 

@Service()
export default class FloorRepo implements IFloorRepo {
  private models: any;
  constructor(
    @Inject('floorSchema') private floorSchema: Model<IFloorPersistence & Document>, 
  ) {}


  public async save (floor: Floor): Promise<Floor> {
   const query = {domainId : floor.id.toString()};
   const floorDocument = await this.floorSchema.findOne(query);
   
    try {
      if(floorDocument === null){


      const rawFloor: any = FloorMap.toPersistence(floor);
      const floorCreated = await this.floorSchema.create(rawFloor);
      return FloorMap.toDomain(floorCreated);

      } else {
        floorDocument.name = floor.name;
        floorDocument.description = floor.description;
        floorDocument.hall = floor.hall;
        floorDocument.room = floor.room;
        floorDocument.floorMap = floor.floorMap;
        floorDocument.hasElevator = floor.hasElevator;
        await floorDocument.save();

        return floor;
      } 
    } catch (err) {
      throw err;
    }
  }

public async exists (floor: Floor): Promise<boolean> {
  const idX = floor.id instanceof FloorId ? (<FloorId>floor.id).toValue : floor.id;
  const query = {domainId: idX};
  const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);
  return !!floorDocument === true;
}

public async findByDomainId (floorId : FloorId | string): Promise <Floor> {
const query = {domainId : floorId};
const floorRecord = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

if (floorRecord != null){
  return FloorMap.toDomain(floorRecord);
}else {
  return null;
}

}

async findAll(): Promise<Floor[]> {
    try {
      const floorDocuments = await this.floorSchema.find({});
      const floors = await Promise.all(floorDocuments.map((doc) => FloorMap.toDomain(doc)));
      return floors;
    } catch (err) {
      throw err;
    }
}

public async updateFloor(floor: Floor): Promise<Floor | null> {
  try {
    const query = { name : floor.name};
    const floorDocument = await this.floorSchema.findOne(query as FilterQuery<IFloorPersistence & Document>);

    if (floorDocument !== null) {
      const rawFloor: any = FloorMap.toPersistence(floor);
      Object.assign(floorDocument, rawFloor);

      await floorDocument.save();

      return FloorMap.toDomain(floorDocument);
    } else {
      return null;
    }
  } catch (err) {
    throw err;
  }
}
}