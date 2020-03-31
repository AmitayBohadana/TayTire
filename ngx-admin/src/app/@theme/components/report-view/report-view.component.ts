import { Component, OnInit, Input } from '@angular/core';

import { ReportVM } from '../../../model/VM/reportVM';
import { WorkEvent } from '../../../model/workEvent';

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

}
