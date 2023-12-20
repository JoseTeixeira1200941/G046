import { Component, OnInit } from '@angular/core';
import { BuildingService } from '../../service/Building/building.service';
import Building from 'src/app/model/building';
import { MessageService } from 'src/app/service/message/message.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list-buildings',
  templateUrl: './list-buildings.component.html',
  styleUrls: ['./list-buildings.component.css']
})
export class ListBuildingsComponent implements OnInit {
  buildings: Building[] = [];
  loading: boolean = true;

  constructor(private buildingService: BuildingService,
    public messageService: MessageService,
    private titleService: Title
    ) {}

  ngOnInit() {
    this.loadBuildings();
    this.titleService.setTitle('RobDroneGo: List Buildings');
  }

  loadBuildings() {
    this.buildingService.getBuildings().subscribe(
      (data: Building[]) => {
        this.buildings = data;
        this.loading = false;
  
        // Log the actual values of building objects
        console.log('Buildings:', this.buildings);
  
        // Optional: Log each building object
        this.buildings.forEach(building => console.log('Building:', building));
      },
      error => {
        console.error('Error:', error);
        if(error.code == 404) this.messageService.add("Error: No Connection to Server")
        this.messageService.add("Error fetching Buildings")
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
