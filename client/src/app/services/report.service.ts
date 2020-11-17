import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';
import { ReportVM } from '../model/VM/reportVM';

@Injectable({
  providedIn: 'root'
})
export class ReportService {






  protected reports:Array<Report> = [];

  constructor(private restService:RestService) {

    this.requestData(this.reportsListCB.bind(this));
   }

   requestData(sucessCB){
    this.restService.get("api/Report1",sucessCB,this.requestFailedCB.bind(this),this);
   }
   test(){
     console.log("lalalala");
   }
   testApi(report,sucessCB) {
    // this.restService.get2("pp");
    // this.restService.get("pp",this.cb.bind(this),this.requestFailedCB.bind(this),this);
    this.restService.post("api/Report1/ReportDoc",report,sucessCB,this.requestFailedCB.bind(this),this);

  }
  cb(res){
    console.log(res);
  }
   removeReport(report:ReportVM,sucessCB) {
    this.restService.post("api/Report1/CancelReport",report,sucessCB,this.requestFailedCB.bind(this),this);
  }
  SetReportDone(report:ReportVM,sucessCB){
    this.restService.post("api/Report1/ReportDone",report,sucessCB,this.requestFailedCB.bind(this),this);
  }
   changeReportStatus(report,sucessCB) {
    this.restService.post("api/Report1/ChangeReportStatus",report,sucessCB,this.requestFailedCB.bind(this),this);
  }
  setReportConfirmed(report: ReportVM,sucessCB) {
    this.restService.post("api/Report1/SetReportConfirmed",report,sucessCB,this.requestFailedCB.bind(this),this);
  }
   requestFailedCB(data){

   }
   reportsListCB(data){

    this.reports = data;

   }
   printReport(report,sucessCB){

     this.restService.post("api/Reports/ReportDoc",report,sucessCB,this.requestFailedCB.bind(this),this);
   }
}
