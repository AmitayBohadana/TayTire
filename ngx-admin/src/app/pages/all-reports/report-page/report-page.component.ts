import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-report-page',
  templateUrl: './report-page.component.html',
  styleUrls: ['./report-page.component.scss']
})
export class ReportPageComponent implements OnInit {
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      reportId: {
        title: "מס' דיווח",
        type: 'number',
      },
      carNum: {
        title: "מס' רכב",
        type: 'number',
      },
      firstName: {
        title: 'שם הנהג',
        type: 'string',
      },
      phoneNum: {
        title: 'טלפון',
        type: 'string',
      },
      username: {
        title: 'Username',
        type: 'string',
      },
      email: {
        title: 'E-mail',
        type: 'string',
      },
      age: {
        title: 'Age',
        type: 'number',
      },
    },
  };
  reportFG:FormGroup;
  source: LocalDataSource = new LocalDataSource();
  reports:Array<ReportVM> = new Array<ReportVM>();
  constructor(private reportService:ReportService) {
    this.source.load([{"carNum":"123344"},{"carNum":"123444444"}]);
    this.createFormGroups();
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.reportService.requestData(this.reportsListCB.bind(this));
  }
  createFormGroups(){
    this.reportFG = new FormGroup({
      confirmationNum: new FormControl('',[Validators.maxLength(12),Validators.required])
    });

  }
  setConfirmation(report:ReportVM){
    console.log("report confirmed req: ",report);
    console.log("report confirmed req: ",this.reportFG.get("confirmationNum").value);
    let confirmationNum = this.reportFG.get("confirmationNum").value;
    report.confirmationNum = confirmationNum;
    this.reportService.changeReportStatus(report,this.reportCB.bind(this));
  }
  reportCB(data){
    console.log("repoty: ",data);
  }
  reportsListCB(data){

    this.reports = data;

    this.loadDataIntoSource();
    // this.source.load([{"carNum":"443344"},{"carNum":"12000"}]);
  }
  loadDataIntoSource(){
    this.reports.forEach(r => {

      let item = this.generateSmartTableItem(r);
      this.source.load([item]);
    });
  }
  generateSmartTableItem(r: ReportVM) {
    return {"carNum":r.vehicle.plateNum,"firstName":r.user.firstName,"phoneNum":r.user.phoneNum};
  }
  printReport(report){
    this.reportService.printReport(report);
  }
  getReportHeader(report){
    return report.vehicle.plateNum + " - "+report.user.firstName;
  }
}
