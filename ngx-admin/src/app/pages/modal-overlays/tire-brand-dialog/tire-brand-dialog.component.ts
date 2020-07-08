import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, Subscription, of } from 'rxjs';
import { TireService } from '../../../services/tire.service';
import { RepairType } from '../../../model/repairType';

@Component({
  selector: 'ngx-tire-brand-dialog',
  templateUrl: './tire-brand-dialog.component.html',
  styleUrls: ['./tire-brand-dialog.component.scss']
})
export class TireBrandDialogComponent implements OnInit, OnDestroy, AfterViewInit {
  public subArray: Subscription = new Subscription();
  public fg: FormGroup;
  public repairType:RepairType;
  myTireBrandsOptions = <any>[];
  filteredControlOptions$: Observable<string[]>;
  public options = [
    { value: 'dead', label: 'בלאי' },
    { value: 'damaged', label: 'נזק' },
  ];
  option = this.options[0];

  constructor(protected ref: NbDialogRef<TireBrandDialogComponent>, private tireService: TireService) { }

  ngAfterViewInit(): void {
    // this.option = 0;
  }
  ngOnInit(): void {
    this.createFormGroup();
    this.seTireManufactureSubscribe();

  }
  ngOnDestroy(): void {
    if (!this.subArray.closed) {
      this.subArray.unsubscribe();
    }
  }
  seTireManufactureSubscribe() {
    this.subArray.add(this.fg.get('manufacture').valueChanges.subscribe(
      term => {
        console.log("value changedL ", term);

        if (term) {
          this.tireService.search(term).subscribe(
            data => {

              this.myTireBrandsOptions = data as any[];
              this.filteredControlOptions$ = of(this.myTireBrandsOptions.slice(0,15));
            })
        }
      }))
  }

  getStatus(formControlName) {
    if (this.fg.get(formControlName).valid) {
      return "info";
    }
    return "danger";
  }

  createFormGroup() {
    this.fg = new FormGroup({
      manufacture: new FormControl('', [Validators.required])
    });
  }
  submit(){
    this.repairType.type.
  }

}
