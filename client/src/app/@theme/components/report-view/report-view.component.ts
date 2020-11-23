import { Component, OnInit, Input } from '@angular/core';

import { ReportVM } from '../../../model/VM/reportVM';
import { WorkEvent } from '../../../model/workEvent';
import { Strings } from '../../../strings';

@Component({
  selector: 'ngx-report-view',
  templateUrl: './report-view.component.html',
  styleUrls: ['./report-view.component.scss']
})
export class ReportViewComponent implements OnInit {


  @Input() report:ReportVM;
  constructor() {

   }

   getWorkEvents():Array<WorkEvent>{
     return this.report.workEvents;
   }
  ngOnInit() {
  }
  IsConfirmed(){
    let res = false;
    if(this.report.status == "confirmed"){
      res = true;
    }
    return res;
  }
  GetStatus(){
    let res = "";
    if(this.IsConfirmed()){
      res = "מאושר";
    }
    return res;
  }
  GetWorkEventToString(work:WorkEvent){
    let res = "";
    if(work.location!= 0){
      res = work.repairType.type +" - "+ Strings.tireLocations[work.location - 1];
    }else{
      res =  work.repairType.type;
    }
    return res;
  }
  GetConfirmationNum(){
    let res = this.report.confirmationNum;
    if(res == ""){
      res = "אין";
    }
    return res;
  }
  GetVehicleNum(){
    return this.report.vehicle.plateNum;
  }
  GetTireSize(){
    return this.report.vehicle.tireSize;
  }

}
