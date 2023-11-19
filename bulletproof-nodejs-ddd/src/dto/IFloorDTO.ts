import {Floor} from '../domain/floor';
import IBuildingDTO from './IBuildingDTO';
export default interface IFloorDTO {
    id: string;
    building: Building;
    name: string;
    description: string;
    hall: string;
    room: number;
    floorMap: string;
    hasElevator: boolean;
    passages: Floor[];
  }
  