import { Component, Input, OnInit } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';

@Component({
  selector: 'ngx-reports-accordion',
  templateUrl: './reports-accordion.component.html',
  styleUrls: ['./reports-accordion.component.scss']
})
export class ReportsAccordionComponent implements OnInit {

  @Input() reports:Array<ReportVM> = new Array<ReportVM>();
  constructor() { }

  ngOnInit(): void {
  }

  isConfirmed(report:ReportVM){
    if(report.status == "confirmed"){
      return true;
    }
    return false;
  }

  getReportHeader(report){
    if(report){
      if(report.vehicle){
        return "רכב: "+report.vehicle.plateNum + " - "+report.user.firstName;
      }
    }
    return "null";
  }
  stopPropagation(event){
    event.stopPropagation();
  }
  SetReportDone(report){
    // this.reportService.SetReportDone(report,this.removeCB.bind(this));
    return false;
  }


}
