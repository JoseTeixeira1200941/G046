import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from '../../model/building';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings-min-max.component.html',
  styleUrls: ['./list-buildings-min-max.component.css']
})
export class ListBuildingsMinMaxComponent implements OnInit {
  buildings: Building[] = [];
  loading: boolean = true;

  minFloor: number = 1; 
  maxFloor: number = 5; 

  constructor(private buildingService: BuildingService,
    private titleService: Title) {}

  ngOnInit() {
    this.loadBuildings();
    this.titleService.setTitle('RobDroneGo: List Buildings (Nº Floors)');
  }

  loadBuildings() {
    this.buildingService.getBuildingMaxMinFloor(this.minFloor, this.maxFloor).subscribe(
      (data: Building[]) => {
        this.buildings = data;
        this.loading = false;
        console.log('Filtered Buildings:', this.buildings);
      },
      error => {
        console.error('Error:', error);
        this.loading = false;
      }
    );
  }
  

  getBuildingProp(building: Building, propPath: string): any {
    const props = propPath.split('.');
    let result: any = building;
  
    for (const prop of props) {
      if (result && result[prop] !== undefined) {
        result = result[prop];
      } else {
        return null;
      }
    }
  
    return result;
  }
  
}
