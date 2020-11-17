import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ReportService } from '../../services/report.service';

@Component({
  selector: 'report-form',
  templateUrl: './report-form.component.html',
})
export class ReportFormComponent {

public reports;
public waitingReports;
public confirmedReports;
public loading=false;
constructor(private router:Router,private reportService:ReportService) {
  this.RequestData();

}
  RequestData(){
    this.loading = true;
    this.reportService.requestData(this.reportsListCB.bind(this));
  }

  toReportinputPage(){
    console.log("navigating!");
    this.router.navigate(['pages/ngx-report-input']);
  }
  GetWatingReports(){
    return this.waitingReports;
  }
  GetConfirmedReports(){
    return this.confirmedReports;
  }
  reportsListCB(data){
    this.reports = data;
    let res;
    res = this.groupBy2(data, "status");
    if(res != null){
      this.waitingReports = res.waiting;
      this.confirmedReports = res.confirmed;
    }
    this.loading = false;
  }
  goToFullScreen(){

    document.body.requestFullscreen();
  }
  groupBy2(xs, prop) {
    var grouped = {};
    for (var i=0; i<xs.length; i++) {
      var p = xs[i][prop];
      if (!grouped[p]) { grouped[p] = []; }
      grouped[p].push(xs[i]);
    }
    return grouped;
  }

}

