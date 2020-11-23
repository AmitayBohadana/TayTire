import { ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';
import { WorkEvent } from '../../../model/workEvent';
import { ReportService } from '../../../services/report.service';
import { Strings } from '../../../strings';

@Component({
  selector: 'ngx-reports-accordion',
  templateUrl: './reports-accordion.component.html',
  styleUrls: ['./reports-accordion.component.scss']
})
export class ReportsAccordionComponent implements OnInit {

  @Input() reports:Array<ReportVM> = new Array<ReportVM>();
  constructor(private reportService:ReportService) { }

  ngOnInit(): void {
  }

  isConfirmed(report:ReportVM){
    if(report.status == "confirmed"){
      return true;
    }
    return false;
  }

  getReportHeader(report:ReportVM){
    let res = "";
    if(report){
      if(report.vehicle){
        res = "רכב: "+report.vehicle.plateNum + " , "+report.user.firstName;
      }

    }
    return res;
  }
  reportConfirmed(report:ReportVM){
    if(report.status =="confirmed"){
      return true;
    }else{
      return false;
    }
  }

  stopPropagation(event){
    event.stopPropagation();
  }
  SetReportDone(report){
    this.reportService.SetReportDone(report,this.ReportDoneCB.bind(this));
    return false;
  }
  ReportDoneCB(data){
    console.log(data)
    // this.getData();
  }

}
