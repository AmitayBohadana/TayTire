import { Component, OnInit } from '@angular/core';
import { Report } from '../../../model/report';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../services/rest.service';
import { Book } from '../../../model/Book';
import { User } from '../../../model/user';
import { Vehicle } from '../../../model/vehicle';
import { Tire } from '../../../model/tire';
import { WorkEvent } from '../../../model/workEvent';

@Component({
  selector: 'ngx-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent implements OnInit {
  protected report:Report = new Report();

  protected form = new FormGroup({
    carNum: new FormControl('',Validators.maxLength(9)),
    km: new FormControl(),
    tireSize: new FormControl(),
    speedCode: new FormControl(),
    omesCode: new FormControl(),
    driverName: new FormControl(),
    driverPhone: new FormControl()
  });
  constructor(private restService:RestService) { }

  ngOnInit() {
  }

  submit(){
    console.log("formGroup: ",this.form);
    this.loadVehicleData();
    this.loadDriverData();
    this.report.user = this.generateUser();
    this.report.vehicle = this.generateVehicle();
    this.report.workEvents = this.generateWorkEvents();
    // this.restService.post("api/Report1",this.report);
    this.restService.get("api/Report1");
    // this.restService.get2("report1");

    console.log("submited")
  }
  generateWorkEvents(){
    let events = new Array<WorkEvent>();
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    return events;
  }
  generateWorkEvent() : WorkEvent{
    let event = new WorkEvent();
    // event.Id ="4444";
    event.workDescription = "תיקון תקר";
    return event;
  }
  loadVehicleData(){
    this.report.vehicle.plateNum = this.form.get('carNum').value;
    this.report.vehicle.km = this.form.get('km').value;
    this.report.vehicle.tireSize = this.form.get('tireSize').value;
    this.printReport();
  }
  loadDriverData(){
    this.report.user.firstName = this.form.get('driverName').value;
    this.report.user.phoneNum = this.form.get('driverPhone').value;
  }
  printReport(){
    console.log("report: ",this.report);
  }
  generateVehicle(){
    let vehicle = new Vehicle();
    // vehicle.Id="4444";
    vehicle.plateNum="12334444";
    vehicle.km=15000;
    vehicle.manufacture="mazda";
    vehicle.model="1992";
    vehicle.tireSize = "175/65/14";
    vehicle.tires = new Array<Tire>();
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    return vehicle;
  }
  generateTire(){
    let tire = new Tire();
    tire.manufacture="michlin";
    tire.omesCode="98";
    tire.speedCode ="V";
    tire.tireSize = "175/65/15";
    return tire;
  }
  generateUser(){
    let user = new User();
    // user.Id = "203314521";
    user.firstName="Amitay";
    user.lastName="בוהדנה";
    user.phoneNum = "0625821583";
    return user;
  }
  getTires(){
    return this.report.vehicle.tires;
  }
}
