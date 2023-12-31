import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { FloorService } from '../../service/Floor/floor.service'
import { MessageService } from 'src/app/service/message/message.service';
import floor from 'src/app/model/floor';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-patch-floor-map',
  templateUrl: './patch-floor-map.component.html',
  styleUrls: ['./patch-floor-map.component.css']
})

export class PatchFloorMapComponent implements OnInit {
  floor = {
    id: "",
    floorMap: ''
  };

  selectedFloorId: string = '';
  floors: floor[] = [];
  floorMapFile: boolean = false;
  
  constructor(
    private location: Location,
    private floorService: FloorService,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.getFloors();
    this.titleService.setTitle('RobDroneGo: Update Floor Map');
  }

  getFloors(): void {
    this.floorService.listFloors().subscribe(
      (floors: floor[]) => {
        this.floors = floors;
      },
      (error: any) => {
        this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching floors', error);
      }
    );
  }

  handleUploadSuccess(filename: string) {
    this.floor.floorMap = filename;
    this.floorMapFile = true;
  }

  editFloorMap() {
    if(this.selectedFloorId && this.floorMapFile){
      this.floor.id = this.selectedFloorId;
      let errorOrSuccess: any = this.floorService.patchFloorMap(this.floor);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Floor map updated with success!");
          this.finalMessage = "Floor map updated with success!";
        },
        
        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    }else{
      this.messageService.add("Error: Please select a floor");
      console.error('Please select a floor');
    }
  }

  goBack(): void {
    this.location.back();
  }
}