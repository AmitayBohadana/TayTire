import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';

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

   requestFailedCB(data){

   }
   reportsListCB(data){

    this.reports = data;

   }
   printReport(report){
     console.log("ReportService - report: ",report);
   }
}
