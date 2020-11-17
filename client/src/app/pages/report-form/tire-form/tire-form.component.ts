import { Component, OnInit, Input, OnDestroy, SimpleChange, ViewChild, AfterViewInit } from '@angular/core';
import { Tire } from '../../../model/tire';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TireService } from '../../../services/tire.service';
import { BaseComponent } from '../../base/base.component';

import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RepairChoiseModalComponent } from '../../modal-overlays/repair-choise-modal/repair-choise-modal.component';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';
import { WorkEvent } from '../../../model/workEvent';
import { ReportInputService } from '../../../services/report-input.service';
import { TireBrandDialogComponent } from '../../modal-overlays/tire-brand-dialog/tire-brand-dialog.component';
import { WheelsSwitcherComponent } from '../../modal-overlays/wheels-switcher/wheels-switcher.component';
import { map } from 'rxjs/operators';

@Component({
  selector: 'ngx-tire-form',
  templateUrl: './tire-form.component.html',
  styleUrls: ['./tire-form.component.scss']
})
export class TireFormComponent extends BaseComponent implements OnInit,AfterViewInit, OnDestroy {
  @Input() tire: Tire;
  @ViewChild('autoInput') input;
  public fg: FormGroup;
  public typesDialogOpen = false;
  public workEvents: Array<WorkEvent> = new Array<WorkEvent>();
  myTireBrandsOptions = ['Option 1', 'Option 2', 'Option 3'];

  filteredControlOptions$: Observable<string[]>;

  constructor(private reportInService: ReportInputService, private tireService: TireService, private dialogService: NbDialogService,
    private repairTypesService: RepairTypesService, private toastrService: NbToastrService) {
    super();
    this.createFormGroup();
  }


  ngOnInit(): void {
    // this.subArray.add(this.fg.get('manufacture').valueChanges.subscribe(
    //   term => {
    //     console.log("value changedL ");

    //     if (term) {

    //       this.tireService.search(term).subscribe(
    //         data => {

    //           this.myTireBrandsOptions = data as any[];
    //           this.filteredControlOptions$ = of(this.myTireBrandsOptions);
    //         })
    //     } else {
    //       this.myTireBrandsOptions = [];
    //     }
    //   }))

  }
  ngAfterViewInit(): void {
    if (this.tire.manufacture != "") {
      this.setValueToInput(this.tire.manufacture);
    }
  }

  onChange2() {
    if (this.input) {
      let term = this.input.nativeElement.value;

      console.log("term: ", term);
      if (term) {

        this.tireService.search(term).subscribe(
          data => {

            this.myTireBrandsOptions = data as any[];
            this.filteredControlOptions$ = of(this.myTireBrandsOptions);
          })
      } else {
        this.myTireBrandsOptions = [];
      }
    }

  }
  onChange() {
    this.filteredControlOptions$ = this.getFilteredOptions(this.input.nativeElement.value);
  }
  submit() {
    if (this.tire) {
      // this.tire.manufacture = this.fg.get('manufacture').value;
      this.tire.manufacture = this.input.nativeElement.value;
      if (this.tire.location == this.reportInService.GetNumOfTires()) {
        this.reportInService.isStage2Complete = true;
      }
    }
  }
  resetForm() {
    this.fg.reset();
    this.fg.get('manufacture').setValue("");
    this.myTireBrandsOptions = [];
    this.filteredControlOptions$ = of(this.myTireBrandsOptions);
  }
  onSelectionChange($event) {
    this.filteredControlOptions$ = this.getFilteredOptions($event);
  }

  getFilteredOptions(value: string): Observable<string[]> {
    return of(value).pipe(
      map(filterString => this.filter(filterString)),
    );
  }
  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.myTireBrandsOptions.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }
  setValueToInput(val){
    if (this.input != null) {
      this.input.nativeElement.value = val;
    }
  }
  ngOnChanges(changes: { [property: string]: SimpleChange }) {

    // Extract changes to the input property by its name
    let change: SimpleChange = changes['tire'];

    if (change != null) {
      //this.tireFormSubmit(change.previousValue);
      console.log("onchange")

      if (this.tire) {
        // this.resetForm();
        this.setValueToInput("");

        let options = { emitEvent: true };
        if (this.tire != null) {
          if (this.tire.manufacture != "") {

            this.setValueToInput(this.tire.manufacture);
            // this.fg.get('manufacture').setValue(this.tire.manufacture, options);
          } else {
            let previus = change.previousValue;
            if (previus) {
              this.myTireBrandsOptions = [previus.manufacture];
              this.filteredControlOptions$ = of(this.myTireBrandsOptions);
            }
          }
        }
      }

      // if (this.tire) {
      //   this.resetForm();
      //   let options = { emitEvent: true };
      //   if (this.tire != null) {
      //     if (this.tire.manufacture != "") {

      //       this.fg.get('manufacture').setValue(this.tire.manufacture, options);
      //     } else {
      //       let previus = change.previousValue;
      //       if (previus) {
      //         this.myTireBrandsOptions = [previus.manufacture];
      //         this.filteredControlOptions$ = of(this.myTireBrandsOptions);
      //       }
      //     }
      //   }
      // }

    }
    // Whenever the data in the parent changes, this method gets triggered. You
    // can act on the changes here. You will have both the previous value and the
    // current value here.
  }
  // tireFormSubmit(tire: Tire) {

  //   if (tire) {

  //     tire.manufacture = this.fg.get('manufacture').value;
  //     this.reportInService.UpdateTire(tire);
  //   }

  // }
  workEventCounter(work: WorkEvent) {
    return this.reportInService.mapWorkEvents[work.repairType.type];
  }
  cameraIconClicked() {

  }
  workEventToDisplay(workEvent: WorkEvent) {
    console.log("work event to display");
    let retVal = workEvent.repairType.type;
    if (workEvent.repairType.code == 3) {
      let counter = this.reportInService.CountSameWorkEventsInSameTire(workEvent);
      // retVal = counter.toString()+"x"+retVal;
      retVal = retVal;
    }
    return retVal;
  }
  createFormGroup() {
    this.fg = new FormGroup({
      manufacture: new FormControl('', [Validators.required]),
      speedCode: new FormControl('', [Validators.required]),
      repairType: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }
  getStatus(formControlName) {
    if (this.fg.get(formControlName).valid) {
      return "info";
    }
    return "danger";
  }

  openRepairTypesDialog() {
    let sub = this.dialogService.open(RepairChoiseModalComponent, {
      context: {
        repairTypes: this.getRepairTypes(),
      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.repairTypeChoosen(repairType)));

    this.typesDialogOpen = true;
  }
  openWheelsSwitcherDialog() {
    let sub = this.dialogService.open(WheelsSwitcherComponent, {
      context: {

      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.repairTypeChoosen(repairType)));

    // this.currentTire = tire;
    this.typesDialogOpen = true;
  }
  getRepairTypes() {
    return this.repairTypesService.GetRepairTypes();
  }
  loadTireToView(tire: Tire) {
    this.fg.reset();
    this.fg.get('manufacture').setValue(tire.manufacture);
    this.fg.get('speedCode').setValue(tire.speedCode);
    // this.stage3form.get('omesCode').setValue(tire.omesCode);
  }
  repairTypeChoosen(type) {

    console.log("thype:", type)
    this.fg.get('repairType').setValue(type.type);
    // this.currentRepairType = type;
    let error = this.ValidateRepairType(type);
    if (error == null) {
      if (this.tire != null) {
        if (this.isNewTireType(type)) {
          this.openNewTireWorkEventModal(type);
        } else if (this.isWheelsSwitchType(type)) {
          this.openWheelsSwitcherDialog();
        } else {
          this.AddNewWorkEvent(type);
        }
      }
    } else {
      this.toastrService.danger(error);
    }
    this.typesDialogOpen = false;
  }
  ValidateRepairType(type: RepairType) {
    let res = null;
    let works: Array<WorkEvent> = this.getWorkEventsDistinct();
    if (works.length > 0) {
      if (this.isNewTireType(type)) {
        res = "אנא הסר עבודות קודמות לפני בחירת צמיג חדש";
      } else {
        let canAdd = true;
        works.forEach(element => {
          // if(element.repairType.code != type.code){
          if (this.isNewTireType(element.repairType)) {
            canAdd = false;
          }
        });
        if (!canAdd) {
          res = "ישנם עבודות קודמות שלא מאפשרות בחירה זו";
        }
      }
    }
    return res;
  }
  newTireModalClosed(type: RepairType) {
    console.log("repairtype: ", type)
    this.AddNewWorkEvent(type);
    // let work = this.tireService.createWorkEvent(type, this.tire.location, "michlin");
  }
  AddNewWorkEvent(type: RepairType) {
    this.reportInService.AddNewWorkEvent(type, this.tire.location);
  }
  openNewTireWorkEventModal(type: RepairType) {
    let sub = this.dialogService.open(TireBrandDialogComponent, {
      context: {
        repairTypeIn: type
      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.newTireModalClosed(repairType)));
  }
  isNewTireType(type: RepairType) {
    let retVal = false;
    if (type.code == 5) {
      retVal = true;
    }
    console.log(retVal + " is tire type: ", type);
    console.log(" retval: ", retVal);
    // if (type.code == 1) {
    //   this.openWheelsSwitcherDialog();
    // }
    return retVal;
  }
  isWheelsSwitchType(type: RepairType) {
    let retVal = false;
    if (type.code == 1) {
      retVal = true;
    }
    // if (type.code == 1) {
    //   this.openWheelsSwitcherDialog();
    // }
    return retVal;
  }
  getWorkEvents() {
    return this.reportInService.getWorkEventsByTire(this.tire);
  }
  getWorkEventsDistinct() {
    let works = this.reportInService.getWorkEventsDistinct(this.tire);
    return works;
  }
  removeRepairType(work: WorkEvent) {
    this.removeWorkEvent(work);
  }

  removeWorkEvent(workEvent: WorkEvent) {
    this.reportInService.removeWorkEvent(workEvent);
  }
  // isNewTireType(workEvent) {
  //   if (workEvent.repairType.code == 5) {
  //     return true;
  //   }
  //   else {
  //     return false;
  //   }
  // }

  hasWorkEvents() {
    let works: Array<WorkEvent> = this.getWorkEvents();
    if (works.length == 0) {
      return "אין";
    }
    return "";
  }

  public addFile(element) {

  }


  test() {

  }

}
