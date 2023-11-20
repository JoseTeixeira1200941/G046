import { Injectable } from '@angular/core';
import { MessageService } from '../message/message.service';
import { HttpClient } from '@angular/common/http';
import robotType from 'src/app/model/robotType';

@Injectable({
  providedIn: 'root'
})

export class RobotService {
  private roomAPI_URL = 'https://localhost:4000/api/robot';

  constructor(private http: HttpClient, private messageService: MessageService) { }

  createRobot(rt: robotType) {
    const headers = {'content-type': 'application/json'};
    
    const body = JSON.stringify(rt);
    console.log(body);
    return this.http.post<robotType>(this.roomAPI_URL + "/createRobot", body, {'headers':headers , observe: 'response'})
  }
}