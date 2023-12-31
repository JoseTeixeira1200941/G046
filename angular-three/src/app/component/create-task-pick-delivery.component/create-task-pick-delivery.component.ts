import { Component, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { MessageService } from 'src/app/service/message/message.service';
import { FloorService } from 'src/app/service/Floor/floor.service';
import { TaskService } from 'src/app/service/Task/task.service';
import floor from 'src/app/model/floor';
import { Title } from '@angular/platform-browser';
import { AuthService } from 'src/app/service/User/auth.service';
import { User } from 'src/app/model/user';
import { RoomService } from 'src/app/service/Room/Room.service';
import Room from 'src/app/model/room';

@Component({
  selector: 'app-create-task-pick-delivery',
  templateUrl: './create-task-pick-delivery.component.html',
  styleUrls: ['./create-task-pick-delivery.component.css']
})
export class CreateTaskPickDeliveryComponent implements OnInit {
  user: User = {};
  floors: floor[] = [];
  rooms: Room[] = [];
  selectedFloorId: string = '';
  selectedRoomId: string = '';

  task = {
    userEmail: "",
    NamePickup: "",
    NameDelivery: "",
    codeDelivery: 1000,
    Floor: "",
    Room: [""],
    Description: "",
  };

  constructor(private authService: AuthService,
    private location: Location,
    private FloorService: FloorService,
    private RoomService: RoomService,
    private TaskService: TaskService,
    private messageService: MessageService,
    private titleService: Title
  ) { }

  @Output() finalMessage: string = '';

  ngOnInit(): void {
    this.user.token = this.authService.getToken();
    this.user = this.authService.getUserFromToken();
    this.getFloors();
    this.getRooms();
    this.titleService.setTitle('RobDroneGo: Create PickUp & Delivery Task');
  }

  getFloors(): void {
    this.FloorService.listFloors().subscribe(
      (floors: floor[]) => {
        this.floors = floors;
      },
      (error: any) => {
        if (error.code == 404) this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching floors', error);
      }
    );
  }

  getRooms(): void {
    this.RoomService.listRooms().subscribe(
      (room: Room[]) => {
        this.rooms = room;
      },
      (error: any) => {
        if (error.code == 404) this.messageService.add("Error: No Connection to Server");
        console.error('Error fetching rooms', error);
      }
    );
  }

  createTask() {
    if (this.selectedFloorId) {
      this.task.userEmail = this.user!.email!;
      this.task.Floor = this.selectedFloorId;
      let errorOrSuccess: any = this.TaskService.pickDelivery(this.task);

      errorOrSuccess.subscribe(
        (data: any) => {
          //success
          this.messageService.add("Success task creation!");
          this.finalMessage = "Success task creation!";
        },

        (error: any) => {
          //error
          this.messageService.add(error.error.message);
          this.finalMessage = error.error.message;
        }
      );
    } else {
      this.messageService.add("Error: Selected floor does not exist");
      console.error('Selected floor does not exist.');
    }
  }

  addRoom() {
    this.task.Room.push("");
  }

  removeRoom(index: number) {
    if (this.task.Room.length > 1) {
      this.task.Room.splice(index, 1);
    }
  }

  goBack(): void {
    this.location.back();
  }
}
