import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';
import { ReportVM } from '../model/VM/reportVM';
import { WorkEvent } from '../model/workEvent';
import { Tire } from '../model/tire';

@Injectable({
  providedIn: 'root'
})
export class ReportInputService {


  public report:ReportVM=new ReportVM();

  constructor(private restService:RestService) { }

  GetNewReportByPlateNum(callBack) {
    this.restService.post("api/Report1/GetNewReportByPlateNum", this.report, callBack);
  }
  SubmitReport() {
    this.restService.post("api/Report1", this.report);
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
    this.report.workEvents.forEach(event => {
      if (event.location == tire.location) {
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
  }


}
