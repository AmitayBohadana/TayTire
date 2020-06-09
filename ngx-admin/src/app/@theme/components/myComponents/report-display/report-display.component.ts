import { Component, OnInit } from '@angular/core';
import { ReportVM } from '../../../../model/VM/reportVM';

@Component({
  selector: 'ngx-report-display',
  templateUrl: './report-display.component.html',
  styleUrls: ['./report-display.component.scss']
})
export class ReportDisplayComponent implements OnInit {

  public report:ReportVM = new ReportVM();
  constructor() { }

  ngOnInit() {
  }

}
