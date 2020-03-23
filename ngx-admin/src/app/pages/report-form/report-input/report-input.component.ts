import { Component, OnInit } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../services/rest.service';
import { Book } from '../../../model/Book';
import { User } from '../../../model/user';
import { Vehicle } from '../../../model/vehicle';
import { Tire } from '../../../model/tire';
import { WorkEvent } from '../../../model/workEvent';
import { carNumberValidator } from '../../../validators/vehicle.validator';
import { UdpCurrencyMaskPipe } from '../../../@theme/pipes/UdpCurrencyMaskPipe';
import { NbDialogService } from '@nebular/theme';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';



@Component({
  selector: 'ngx-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent implements OnInit {

  protected report:ReportVM = new ReportVM();
  protected reportState = 1;
  protected currentTire:Tire;
  protected currentRepairType:RepairType;
  protected typesDialogOpen = false;

  protected stage1form:FormGroup;
  protected stage2form:FormGroup;
  protected stage3form:FormGroup;

  constructor(private restService:RestService,private currencyMask: UdpCurrencyMaskPipe,private dialogService: NbDialogService,
    private repairTypesService:RepairTypesService) {
      repairTypesService.requestData();
      this.createFormGroups();

   }

  ngOnInit() {
    // this.setSubscribers();
  }
  createFormGroups(){
    this.stage1form = new FormGroup({
      carNum: new FormControl('',[Validators.maxLength(9),carNumberValidator(),Validators.required]),
      km: new FormControl('',[Validators.required,Validators.pattern("^[0-9]*$")]),
      tireSize: new FormControl('',[Validators.required]),
      speedCode: new FormControl('',[Validators.required]),
      omesCode: new FormControl('',[Validators.required])
    });
    this.stage2form = new FormGroup({
      fullName: new FormControl('',[Validators.required]),
      phoneNum: new FormControl('',[Validators.required])
    });
    this.stage3form = new FormGroup({
      manufacture: new FormControl('',[Validators.required]),
      speedCode: new FormControl('',[Validators.required]),
      omesCode: new FormControl('',[Validators.required]),
      repairType: new FormControl('',[Validators.required])
    });
  }
  loadTireToView(tire:Tire){
    this.stage3form.reset();
    this.stage3form.get('manufacture').setValue(tire.manufacture);
    this.stage3form.get('speedCode').setValue(tire.speedCode);
    this.stage3form.get('omesCode').setValue(tire.omesCode);
    console.log("tire loaded to view: ",tire);
  }
  loadViewToTire(tire){
    tire.manufacture = this.stage3form.get('manufacture').value;
    tire.speedCode =this.stage3form.get('speedCode').value;
    tire.omesCode = this.stage3form.get('omesCode').value;
  }
  getRepairTypes(){
    return this.repairTypesService.GetRepairTypes();
  }

  submit(){

    this.loadVehicleData();
    this.loadDriverData();
    this.loadWorkEventData();
    // this.report.user = this.generateUser();
    console.log("report: ",this.report);
    this.restService.post("api/Report1",this.report);
    // this.restService.post("api/Report1/GetReportByPlateNum",this.report);


    // this.restService.get("api/RepairType",this.successCB.bind(this));
    // this.restService.get2("report1");
  }
  getReportByCarNum(){

    this.loadVehicleData();
    this.restService.post("api/Report1/GetReportByPlateNum",this.report,this.successCB.bind(this));
  }

  GetNewReportByPlateNum(){
    this.loadVehicleData();
    this.restService.post("api/Report1/GetNewReportByPlateNum",this.report,this.newReportByPlateNumCB.bind(this));
  }


  loadWorkEventData(){

  }
  newReportByPlateNumCB(res){
    console.log("res at report input: ",res);
    let reportVm:ReportVM = res;
    this.report = reportVm;
    this.loadReportToView();
    this.setCurrentTireByLocation(1);
  }
  loadReportToView(){
    this.stage1form.get('tireSize').setValue(this.report.vehicle.tireSize);
  }
  focusOutFunction(controlerName){
    console.log("focus out: "+controlerName);

    if(controlerName){
      console.log(controlerName+" value: "+this.stage1form.get(controlerName).value);
      if(this.stage1form.get(controlerName).valid){
        this.GetNewReportByPlateNum();
      }
    }
  }
  successCB(res){

    console.log("res at report input: ",res);

  }
  openRepairTypesDialog(tire){
    this.typesDialogOpen = this.switch(this.typesDialogOpen);
    if(this.typesDialogOpen){
      this.currentTire = tire;
    }else{
      this.currentTire = null;
    }

    // this.dialogService.open(RepairTypesDialogComponent, {
    //   context: {
    //     title: 'This is a title passed to the dialog component',
    //     list:null
    //   },
    // });
    // this.open();
  }
  switch(bol: boolean): boolean {
    if(bol){
      return false;
    }
    return true;
  }

  // open() {
  //   this.dialogService.open(ShowcaseDialogComponent, {
  //     context: {
  //       title: 'This is a title passed to the dialog component',
  //     },
  //   });
  // }

  generateWorkEvents(){
    let events = new Array<WorkEvent>();
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    return events;
  }
  stageComplete(stageNum){
    if(stageNum == 1){
      return this.stage1form.valid;
    }else if(stageNum == 2){
      return this.stage2form.valid;
    }
  }
  generateWorkEvent() : WorkEvent{
    let event = new WorkEvent();
    // event.Id ="4444";
    event.workDescription = "תיקון תקר";
    return event;
  }
  getWorkEvents(tire:Tire){
    let events = new Array<WorkEvent>();
    this.report.workEvents.forEach(event =>{
      if(event.location == tire.location){
        events.push(event);

      }
    });
    return events;
  }
  loadVehicleData(){
    this.report.vehicle.plateNum = this.stage1form.get('carNum').value;
    if( this.stage1form.get('km').value != null){
      if(this.stage1form.get('km').value != ""){
        this.report.vehicle.km = this.stage1form.get('km').value;
      }
    }
    this.report.vehicle.tireSize = this.stage1form.get('tireSize').value;
    this.printReport();
  }
  loadDriverData(){
    this.report.user.firstName = this.stage2form.get('fullName').value;
    this.report.user.phoneNum = this.stage2form.get('phoneNum').value;
  }
  printReport(){
    console.log("report: ",this.report);
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
  prevTire(currentTire){
    this.setCurrentTireByLocation(currentTire.location-1);
  }
  tireSubmit(tire:Tire){
    this.loadViewToTire(tire);
    this.setCurrentTireByLocation(tire.location+1);
    // tire.manufacture = this.stage3form.get('manufacture').value;
    // if(this.currentRepairType != null){
    //   this.newWorkEvent(tire);
    // }

    // this.nextTire();
  }

  nextTire(){
    this.stage3form.reset();

    this.currentRepairType = null;
  }
  setCurrentTireByLocation(location){
    let tires = this.getTires();
    tires.forEach(tire=>{
      if(tire.location == location){
        this.setCurrentTire(tire);
        this.loadTireToView(this.currentTire);
      }
    });
  }
  setCurrentTire(tire:Tire){
    this.currentTire = tire;

  }

  repairSubmit(type){
    this.stage3form.get('repairType').setValue(type.type);
    // this.currentRepairType = type;
    if(this.currentTire!=null){
      this.newWorkEvent(type);
    }

  }
  newWorkEvent(type:RepairType){
    let work = new WorkEvent();
    work.location = this.currentTire.location;
    console.log("location: ",work.location);
    work.repairType = type;
    work.amount++;
    this.report.workEvents.push(work);
  }

  getStatus(stage,formControlName){
    let formGroup:FormGroup = this.getFormGroupByStage(stage);
    if(formGroup.get(formControlName).valid){
      return "info";
    }
    return "danger";
  }
  getFormGroupByStage(stage){
    if(stage == 1){
      return this.stage1form;
    }else if(stage === 2){
      return this.stage2form;
    }else if(stage === 3){
      return this.stage3form;
    }
  }
  stage1complete(){
    let plateNum = this.stage1form.get('carNum').value;
    let km = this.stage1form.get('km').value;
    let tireSize = this.stage1form.get('tireSize').value+" "+this.stage1form.get('speedCode').value+this.stage1form.get('omesCode').value;
    this.setVehicleData(plateNum,km,tireSize); //to it only in the end
    this.printReport();
  }
  stage2complete(){
    let fullName = this.stage2form.get('fullName').value;
    let phoneNum = this.stage2form.get('phoneNum').value;
    this.setDriverData(fullName,phoneNum); //to it only in the end
    this.printReport();
    this.reportState = 2;
  }
  setDriverData(fullName: any, phoneNum: any) {
    this.report.user.firstName = fullName;
    this.report.user.phoneNum = phoneNum;
  }
  setVehicleData(plateNum: any, km: number, tireSize: string) {
    this.report.vehicle.plateNum = plateNum;
    this.report.vehicle.km = +km;
    this.report.vehicle.tireSize = tireSize;
  }

  setSubscribers(){
    this.stage1form.valueChanges.subscribe(val => {

      if (typeof val.km === 'string') {
        const maskedVal = this.currencyMask.transform(val.km);
        if (val.km !== maskedVal) {
          this.stage1form.patchValue({amount: maskedVal});
        }
      }
    });

  }






  formDataInsert(stage){
    if(stage == 1){
      let vehicle:Vehicle = this.generateVehicle();
      this.stage1form.get('carNum').setValue(vehicle.plateNum);
      this.stage1form.get('km').setValue(vehicle.km);
      this.stage1form.get('tireSize').setValue(vehicle.tireSize);
      this.stage1form.get('speedCode').setValue(vehicle.tireSize);
      this.stage1form.get('omesCode').setValue(vehicle.tireSize);

    }
    if(stage == 2){
      let vehicle:Vehicle = this.generateVehicle();
      this.stage2form.get('fullName').setValue("אבי ביטר");
      this.stage2form.get('phoneNum').setValue("051511111");


    }
  }


  generateVehicle(){
    let vehicle = new Vehicle();
    // vehicle.Id="4444";
    vehicle.plateNum="7999672";
    vehicle.km=15000;
    vehicle.tireSize = "175/65/14";
    vehicle.tires = new Array<Tire>();
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    return vehicle;
  }


}
