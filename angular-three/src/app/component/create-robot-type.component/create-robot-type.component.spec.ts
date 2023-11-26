import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { of, throwError } from 'rxjs'; 
import { CreateRobotTypeComponent } from './create-robot-type.component';
import { RobotService } from 'src/app/service/Robot/Robot.service.service';

describe('CreateRobotTypeComponent', () => {
  let component: CreateRobotTypeComponent;
  let fixture: ComponentFixture<CreateRobotTypeComponent>;
  let robotService: RobotService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateRobotTypeComponent],
      imports: [
        HttpClientTestingModule,
        FormsModule
      ],
      providers: [RobotService]
    }).compileComponents();
  });


  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRobotTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    robotService = TestBed.inject(RobotService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default robotType values', () => {
    expect(component.robotType).toEqual({
      designation: '',
      brand: '',
      modelRobot: '',
      task: 0
    });
  });

  it('should call createRobotType and return robotType data', () => {
    const response = { message: 'Success robot type creation!' };
    spyOn(robotService, 'createRobot').and.returnValue(of(response));
    component.createRobotType();
    expect(robotService.createRobot).toHaveBeenCalledWith(component.robotType);
  });

  it('should handle error on createRobot', () => {
    spyOn(robotService, 'createRobot').and.returnValue(throwError(() => new Error('Error')));
    component.createRobotType();
  });
});
