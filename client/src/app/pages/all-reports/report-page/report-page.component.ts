import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../services/rest.service';

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
  public url = "";
  constructor(private reportService:ReportService,private restService:RestService) {
    // this.source.load([{"carNum":"123344"},{"carNum":"123444444"}]);
    this.createFormGroups();
   }

  ngOnInit() {
    this.getData();
  }
  testApiFromProxyConf(){

    this.restService.get("pp",this.cb.bind(this),this.requestFailedCB.bind(this),this);
  }
  withNamed(){
    // this.restService.getWithNamedContainer("pp",this.cb.bind(this),this.requestFailedCB.bind(this),this);
  }
  testApiHardCoded(){

    this.restService.get3("pp",this.cb.bind(this),this.requestFailedCB.bind(this),this);
  }
  testWithIput(){
    // this.restService.getWithFullAdress(this.url+"/pp",this.cb.bind(this),this.requestFailedCB.bind(this),this);
  }
  cb(data){
    console.log("res: ",data);
  }

  testApi(report){
    // this.reportService.test();
    this.reportService.testApi(report,this.printReportCB.bind(this));
  }
  requestFailedCB(data){

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
    this.getData();
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
    if(report){
      if(report.vehicle){
        return "מס' רכב: "+report.vehicle.plateNum + " - "+report.user.firstName;
      }
    }
    return "null";
  }
  printReportCB(res){
    let pdfData = res;
    var FileSaver = require('file-saver');
    var byte8Array = new Uint8Array(pdfData);
    var file = new Blob([byte8Array]);
    FileSaver.saveAs(file, "mypdf.pdf");
  }
  removeItem(report){
    this.reportService.removeReport(report,this.removeCB.bind(this));
    return false;
  }
  SetReportDone(report){
    this.reportService.SetReportDone(report,this.removeCB.bind(this));
    return false;
  }

  removeCB(data){
    this.getData();
  }

  stopPropagation(event){
    event.stopPropagation();
  }
}
