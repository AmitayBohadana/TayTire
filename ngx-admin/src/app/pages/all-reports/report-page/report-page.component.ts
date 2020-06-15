import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';


import { SmartTableData } from '../../../@core/data/smart-table';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { saveAs } from 'file-saver';

// declare var saveAs:any;
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
  // source: LocalDataSource = new LocalDataSource();
  source;
  reports:Array<ReportVM> = new Array<ReportVM>();
  constructor(private reportService:ReportService) {
    // this.source.load([{"carNum":"123344"},{"carNum":"123444444"}]);
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
    let confirmationNum = this.reportFG.get("confirmationNum").value;
    report.confirmationNum = confirmationNum;
    // this.reportService.changeReportStatus(report,this.reportCB.bind(this));
    this.reportService.setReportConfirmed(report,this.reportCB.bind(this));
  }
  reportCB(data){
  }
  isConfirmed(report:ReportVM){
    if(report.status == "confirmed"){
      return true;
    }
    return false;
  }
  reportsListCB(data){

    this.reports = data;

    this.loadDataIntoSource();
    // this.source.load([{"carNum":"443344"},{"carNum":"12000"}]);
  }
  loadDataIntoSource(){
    this.reports.forEach(r => {

      let item = this.generateSmartTableItem(r);
      // this.source.load([item]);
    });
  }
  generateSmartTableItem(r: ReportVM) {
    return {"carNum":r.vehicle.plateNum,"firstName":r.user.firstName,"phoneNum":r.user.phoneNum};
  }
  printReport(report){
    this.reportService.printReport(report,this.printReportCB.bind(this));
  }
  getReportHeader(report){
    return report.vehicle.plateNum + " - "+report.user.firstName;
  }
  printReportCB(res){

    let pdfData = res;
    var byte8Array = new Uint8Array(pdfData);
    var file = new Blob([byte8Array]);
    saveAs(file,"mypdf.pdf");

    // var fileURL = URL.createObjectURL(file);
    // window.open(fileURL); // if you want to open it in new tab
  }
  removeItem(report){
    this.reportService.removeReport(report,this.removeCB.bind(this));
    return false;
  }

  removeCB(data){
    console.log("data: ",data);
    this.getData();
  }

  stopPropagation(event){
    event.stopPropagation();
  }
}
