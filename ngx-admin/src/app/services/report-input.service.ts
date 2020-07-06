import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Report } from '../model/report';
import { ReportVM } from '../model/VM/reportVM';

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

}
