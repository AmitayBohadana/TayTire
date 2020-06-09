import { Component, OnInit, Input, Output } from '@angular/core';
import { RepairType } from '../../../model/repairType';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-repair-choise-modal',
  templateUrl: './repair-choise-modal.component.html',
  styleUrls: ['./repair-choise-modal.component.scss']
})
export class RepairChoiseModalComponent implements OnInit {
  @Input() repairTypes:Array<RepairType>;
  @Output() repairType:RepairType;
  constructor(protected ref: NbDialogRef<RepairChoiseModalComponent>) { }

  ngOnInit() {
  }

  getRepairTypes(){
    return this.repairTypes;
  }
  repairSubmit(type){
    this.ref.close(type);
  }

  dismiss(){

  }

}
