export default interface IBuildingDTO {
  id: string;
  name: string;
  localizationoncampus: string;
  floors: number;
  lifts: number;
  maxCel: number[];
  // You can add more properties specific to building information as needed.
}
