import { Component, OnInit } from '@angular/core';
import { ReportService } from '../../../services/report.service';
import { LocalDataSource } from 'ng2-smart-table';

import { SmartTableData } from '../../../@core/data/smart-table';
import { ReportVM } from '../../../model/VM/reportVM';

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

  source: LocalDataSource = new LocalDataSource();
  reports:Array<ReportVM> = new Array<ReportVM>();
  constructor(private reportService:ReportService) {
    this.source.load([{"carNum":"123344"},{"carNum":"123444444"}]);
   }

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.reportService.requestData(this.reportsListCB.bind(this));
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
}
