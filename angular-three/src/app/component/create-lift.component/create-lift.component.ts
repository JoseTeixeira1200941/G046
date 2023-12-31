import { Component, OnInit, Output, ViewChild } from '@angular/core';
import { LiftService } from '../../service/Lift/lift.service';
import { BuildingService } from 'src/app/service/Building/building.service';
import Building from 'src/app/model/building';
import { MessageService } from 'src/app/service/message/message.service';
import Lift from 'src/app/model/lift';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-create-lift',
  templateUrl: './create-lift.component.html',
  styleUrls: ['./create-lift.component.css']
})

export class CreateLiftComponent implements OnInit {
  @Output() finalMessage: string = '';
  liftData = {
    localization: '',
    state: '',
    building: ''
  };

  buildings: Building[] = [];

  constructor(
    private liftService: LiftService, 
    private buildingService: BuildingService,
    public messageService: MessageService,
    private titleService: Title,
    ) {}
  ngOnInit() {
    this.getBuildings();
    this.titleService.setTitle('RobDroneGo: Create Lift');

  }

  createLift() {
    this.liftService.createLift(this.liftData).subscribe(
      (response : any) => {
        const liftResponse = response as Lift;  // Type assertion
        const liftInfo = `Lift created successfully. Details - Localization: ${liftResponse.localization}, State: ${liftResponse.state}`;
        this.messageService.add(liftInfo);

      },
      error => {
        
        this.messageService.add('Error: creating lift: ' + error.message);
      }
    );
  }
  getBuildings(): void {
    this.buildingService.getBuildings().subscribe(
      (buildings: Building[]) => {
        this.buildings = buildings;
      },
      (error: any) => {
        if(error.code == 404) this.messageService.add("Error: No Connection to Server")
      }
    );
  }
}
