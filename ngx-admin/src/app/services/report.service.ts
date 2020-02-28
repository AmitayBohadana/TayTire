import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';

@Injectable({
  providedIn: 'root'
})
export class ReportService {


  protected reports:Array<Report> = [];

  constructor(private restService:RestService) {
    console.log("request data");
    this.requestData();
   }

   requestData(){
    this.restService.get("api/Report1",this.reportsListCB.bind(this),this.requestFailedCB.bind(this),this);
   }

   requestFailedCB(data){
    console.log("falied CB data: ",data);
   }
   reportsListCB(data){
     console.log("data: ",data);
     console.log("this.reports: ",this.reports);
    this.reports = data;
    console.log("this.reports: ",this.reports);
   }
}
