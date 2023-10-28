import { Building } from '../domain/building';
import { Floor } from '../domain/floor';
import { RoomCategory } from '../domain/room';

export default interface IRoomDTO {
  id: string;
  building: Building;
  floor: Floor;
  name: string;
  category: RoomCategory;
  description: string;
  dimension: number[];
}