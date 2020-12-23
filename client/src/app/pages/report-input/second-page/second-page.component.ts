import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RepairType } from '../../../model/repairType';
import { RepairTypesService } from '../../../services/repair-types.service';
import { ReportInputService } from '../../../services/report-input.service';

@Component({
  selector: 'second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent implements OnInit {
  public fg;
  public repairTypes:Array<RepairType>=[];
  constructor(private router: Router, private repairTypeService:RepairTypesService,
     private activeRoute: ActivatedRoute, private reportInService: ReportInputService) {
      this.repairTypes = this.repairTypeService.GetRepairTypes();
      }

  ngOnInit(): void {

    console.log("this.tpyes ",this.repairTypeService.GetRepairTypes())
  }

  repairClicked(r){
    console.log("r: ",r);
  }

}
