import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbDialogService } from '@nebular/theme';
import { RepairType } from '../../../model/repairType';
import { RepairTypesService } from '../../../services/repair-types.service';
import { ReportInputService } from '../../../services/report-input.service';
import { BaseComponent } from '../../base/base.component';

@Component({
  selector: 'second-page',
  templateUrl: './second-page.component.html',
  styleUrls: ['./second-page.component.scss']
})
export class SecondPageComponent extends BaseComponent implements OnInit  {
  public fg = new FormGroup({
    manufacture: new FormControl('', []),
  });;
  public repairTypes:Array<RepairType>=[];
  constructor(private router: Router, private repairTypeService:RepairTypesService,
     private activeRoute: ActivatedRoute, private reportInService: ReportInputService,private dialogService:NbDialogService) {
       super();
      this.repairTypes = this.repairTypeService.GetRepairTypes();
      }

  ngOnInit(): void {

    console.log("this.tpyes ",this.repairTypeService.GetRepairTypes())
  }

  repairClicked(r){
    console.log("r: ",r);
  }
  // openRepairTypesDialog() {
  //   let sub = this.dialogService.open(RepairChoiseModalComponent, {
  //     context: {
  //     },
  //   });
    
  //   this.subArray.add(sub.onClose.subscribe(x => x));
  // }

}
