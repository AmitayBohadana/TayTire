import { Component, OnInit, Input } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-repair-types-dialog',
  templateUrl: './repair-types-dialog.component.html',
  styleUrls: ['./repair-types-dialog.component.scss']
})
export class RepairTypesDialogComponent implements OnInit {

  @Input() title: string;
  @Input() list: Array<any>;

  constructor(protected ref: NbDialogRef<RepairTypesDialogComponent>) { }


  ngOnInit() {
  }

  cancel() {
    this.ref.close();
  }

}
