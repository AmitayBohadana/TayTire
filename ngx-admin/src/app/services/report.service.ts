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
   removeReport(report:ReportVM,sucessCB) {
    this.restService.post("api/Report1/CancelReport",report,sucessCB,this.requestFailedCB.bind(this),this);
  }
   changeReportStatus(report,sucessCB) {
    this.restService.post("api/Report1/ChangeReportStatus",report,sucessCB,this.requestFailedCB.bind(this),this);
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
