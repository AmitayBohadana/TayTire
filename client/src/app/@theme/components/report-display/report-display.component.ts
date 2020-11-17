import { Component, OnInit, Input } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { ToasterService } from 'angular2-toaster';
import { ReportVM } from '../../../model/VM/reportVM';
import { WorkEvent } from '../../../model/workEvent';
import { ReportInputService } from '../../../services/report-input.service';
import { Strings } from '../../../strings';

@Component({
  selector: 'ngx-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.scss']
})
export class ReportDisplayComponent implements OnInit {

  @Input() report:ReportVM;
  public loading = false;

  constructor(private reportInService:ReportInputService,private toastrService: NbToastrService) { }

  getWorkEvents():Array<WorkEvent>{
    return this.report.workEvents;
  }
 ngOnInit() {
 }
 GetTires(){
   return this.reportInService.report.vehicle.tires;
 }
 getTireLocationStr(tire){
  return Strings.tireLocations[tire.location - 1];
 }

 GetLisingCompany(){
   let res = this.report.leasingCompany;
   if(!res){
    res = "לא נבחר";
   }
 }

 GetReportStatus(){
   return this.report.status;
 }
 GetCarPlateNum(){
   return this.report.vehicle.plateNum;
 }
 GetTireSize(){
   return this.report.vehicle.tireSize;
 }
 submitReport(){
   this.loading = true;
  this.reportInService.SubmitReport(this.submitReportCB.bind(this),this.failedCB.bind(this));
 }
 GetVhicleModelStr(){
   if(this.report.vehicle.manufacture && this.report.vehicle.model){
    return ""+this.report.vehicle.manufacture + this.report.vehicle.model;
   }else{
    return "";
   }

 }
 submitReportCB(report:ReportVM){
   if(report!=null){
    this.loading = false;
    this.toastrService.primary("הדיווח התקבל!");
   }
 }
 failedCB(res){
  this.loading = false;
  this.toastrService.primary("פעולה נכשלה");
 }
}
