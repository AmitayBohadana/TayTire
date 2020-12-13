import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';
import { ReportVM } from '../model/VM/reportVM';
import { WorkEvent } from '../model/workEvent';
import { Tire } from '../model/tire';
import { RepairType } from '../model/repairType';

@Injectable({
  providedIn: 'root'
})
export class ReportInputService {


  public report:ReportVM=new ReportVM();
  public vehicleWorkEvents = new Array<WorkEvent>();


  public mapWorkEvents:Map<string,number> = new Map<string,number>();
  public isStage2Complete = false;
  constructor(private restService:RestService) { }


  validateReport() {
    let res = true;
    console.log("tires: = ");
    if(this.report.vehicle.tires != null){
      this.report.vehicle.tires.forEach(tire=>{

        if(tire.manufacture == ""){
          res = false;
        }
      })
    }
    return res;
  }
  resetReport(){
    this.report=new ReportVM();
  }
  CountSameWorkEventsInSameTire(workIn: WorkEvent) {
    let counter = 0;
    this.report.workEvents.forEach(work=>{
      if(work.repairType.code == workIn.repairType.code && work.location == workIn.location){
        counter++;
      }
    });
    return counter;
  }

  SetPhoneNumber(phoneNum: any) {
    this.report.user.phoneNum = phoneNum +"";
  }
  UpdateTire(tireIn:Tire) {

    let tire = this.GetTireByLocation(tireIn.location);
    tire.manufacture = tireIn.manufacture;
    let report = this.report;
  }
  AddNewWorkEvent(type: RepairType,location,amount = null) {
    let work = this.createWorkEvent(type,location,amount);
    this.pushWorkEvent(work);

  }
  GetExistWorks(type: RepairType,location){
    let res:WorkEvent = null;
    let workEvents = this.GetWorkEventsByTireLocation(location);
  }
  createWorkEvent(type: RepairType,location,amount?) {
    let work = new WorkEvent();
    work.location = location;
    work.repairType = type;
    if(amount){
      work.amount = amount;
    }else{
      work.amount++;
    }
    return work;
  }
  hasVehicleWorkEvents() {
    let res = false;
    if(this.vehicleWorkEvents){
      if(this.vehicleWorkEvents.length > 0){
        res = true;
      }
    }
    return res;
  }
  private pushWorkEvent(work: WorkEvent) {
    this.report.workEvents.push(work);
    this.pushWorkEventToMap(work);
    if(this.isVehicleWorkEvent(work)){
      this.vehicleWorkEvents.push(work);
    }
  }
  isVehicleWorkEvent(work: WorkEvent) {
    let res = false;
    if(work.repairType.code == 1){
      res = true;
    }
    return res;
  }
  pushWorkEventToMap(work: WorkEvent) {
    if(!this.mapContainsWorkEvent(work)){
      this.mapWorkEvents[work.repairType.type] = 1;
    }else{
      this.mapWorkEvents[work.repairType.type] = this.mapWorkEvents[work.repairType.type] +1;
    }
  }
  mapContainsWorkEvent(work: WorkEvent){
    let retVal = false;
    if(this.mapWorkEvents[work.repairType.type]!= null){
      retVal = true;
    }
    return false;
  }
  GetNewReportByPlateNum(callBack) {
    this.restService.post("api/Report1/GetNewReportByPlateNum", this.report, callBack);
  }
  GetVehicleFromGov(plateNum,callBack,faliedCB){

    var data = {
      resource_id: '053cea08-09bc-40ec-8f7a-156f0677aff3', // the resource id
      limit: 5, // get 5 results
      q: plateNum // query for 'jones'
    };
    // this.restService.getFromGov("https://data.gov.il/api/3/action/datastore_search",data,callBack);
    this.restService.getFromGov("/gov",plateNum,callBack,faliedCB);

  }
  GetVehicleByPlateNum(callBack){
    this.restService.post("api/Report1/GetVehicleByPlateNum", this.report.vehicle, callBack);
  }
  SubmitReport(callBack,faliedCB) {
    this.restService.post("api/Report1", this.report,callBack,faliedCB);
  }
  SubmitReportCB(data){
    console.log("res: ",data)
    //delete it
  }

  printReport() {

    console.log("report: ", this.report);
  }
  GetTireByLocation(tireLocation: number) {
    let retVal:Tire;
    this.report.vehicle.tires.forEach(tire=>{
      if(tire.location == tireLocation){
        retVal = tire;
      }
    });
    return retVal;
  }
  GetNumOfTires(){
    return this.report.vehicle.tires.length;
  }
  getWorkEventsByTire(tire: Tire) {
    let events = new Array<WorkEvent>();
    events = this.GetWorkEventsByTireLocation(tire.location);
    return events;
  }
  GetWorkEventsByTireLocation(location: number) {
    let events = new Array<WorkEvent>();
    this.report.workEvents.forEach(event => {
      if (event.location == location) {
        events.push(event);
      }
    });
    return events;
  }
  removeWorkEvent(work: WorkEvent) {
    const index: number = this.report.workEvents.indexOf(work);
    if (index !== -1) {
      this.report.workEvents.splice(index, 1);
    }
    const index2: number = this.vehicleWorkEvents.indexOf(work);
    if (index2 !== -1) {
      this.vehicleWorkEvents.splice(index2, 1);
    }
  }
  getVehicleWorkEventsDistinct() {
    return this.vehicleWorkEvents;
  }
  getWorkEventsDistinct(tire:Tire){
    let retVal:Array<WorkEvent> = new Array<WorkEvent>();
    let allWorkEvents =  this.getWorkEventsByTire(tire);
    allWorkEvents.forEach(work=>{
      let index: number = retVal.indexOf(work);
    if (index !== -1) {

    }else{
      retVal.push(work);
    }
    });
    return retVal;
  }


}
