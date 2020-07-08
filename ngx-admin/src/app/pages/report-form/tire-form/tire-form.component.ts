import { Component, OnInit, Input } from '@angular/core';
import { Tire } from '../../../model/tire';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { TireService } from '../../../services/tire.service';
import { BaseComponent } from '../../base/base.component';

import { NbDialogService } from '@nebular/theme';
import { RepairChoiseModalComponent } from '../../modal-overlays/repair-choise-modal/repair-choise-modal.component';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';
import { WorkEvent } from '../../../model/workEvent';
import { ReportInputService } from '../../../services/report-input.service';
import { TireBrandDialogComponent } from '../../modal-overlays/tire-brand-dialog/tire-brand-dialog.component';

@Component({
  selector: 'ngx-tire-form',
  templateUrl: './tire-form.component.html',
  styleUrls: ['./tire-form.component.scss']
})
export class TireFormComponent extends BaseComponent implements OnInit {
  @Input() tire: Tire;

  public fg: FormGroup;
  public typesDialogOpen = false;
  myTireBrandsOptions = <any>[];
  filteredControlOptions$: Observable<string[]>;

  constructor(private reportInService: ReportInputService, private tireService: TireService, private dialogService: NbDialogService, private repairTypesService: RepairTypesService) {
    super();
    this.createFormGroup();
  }

  ngOnInit(): void {
    this.subArray.add(this.fg.get('manufacture').valueChanges.subscribe(
      term => {
        console.log("value changedL ", term);

        if (term) {
          this.tireService.search(term).subscribe(
            data => {

              this.myTireBrandsOptions = data as any[];
              this.filteredControlOptions$ = of(this.myTireBrandsOptions);
            })
        }
      }))
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
  setManufactureOptionsSubs() {
    this.subArray.add(this.fg.get('manufacture').valueChanges.subscribe(
      term => {
        console.log("value changedL ", term);

        if (term) {
          this.tireService.search(term).subscribe(
            data => {

              this.myTireBrandsOptions = data as any[];
              this.filteredControlOptions$ = of(this.myTireBrandsOptions);
            })
        }
      }))

  }
  openRepairTypesDialog() {
    let sub = this.dialogService.open(RepairChoiseModalComponent, {
      context: {
        repairTypes: this.getRepairTypes(),
      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.repairSubmit(repairType)));

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
  repairSubmit(type) {
    this.fg.get('repairType').setValue(type.type);
    // this.currentRepairType = type;
    if (this.tire != null) {
      this.newWorkEvent(type);
    }
    this.typesDialogOpen = false;
  }
  newWorkEvent(type: RepairType) {
    if(this.isNewTire(type)){
      this.openNewTireWorkEventModal();
    }
    let work = this.tireService.createWorkEvent(type, this.tire.location, "michlin");
    this.reportInService.report.workEvents.push(work);
    // this.report.workEvents.push(work);
  }
  openNewTireWorkEventModal() {
    let sub = this.dialogService.open(TireBrandDialogComponent, {
      context: {
      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.repairSubmit(repairType)));
  }
  isNewTire(type: RepairType) {
    let retVal = false;
    if (type.code == 5) {
      retVal = true;
    }
    return retVal;
  }
  getWorkEvents() {
    return this.reportInService.getWorkEventsByTire(this.tire);
  }
  removeRepairType(work: WorkEvent) {
    this.removeWorkEvent(work);
  }

  removeWorkEvent(workEvent: WorkEvent) {
    this.reportInService.removeWorkEvent(workEvent);
  }
  isNewTireType(workEvent) {
    if (workEvent.repairType.code == 5) {
      return true;
    }
    else {
      return false;
    }
  }

  hasWorkEvents() {
    let works: Array<WorkEvent> = this.getWorkEvents();
    if (works.length == 0) {
      return "אין";
    }
    return "";
  }

  public addFile(element) {
    // const formData = new FormData();
    // let tirePic = new TirePic();
    // tire.image = element.target.files.item(0);

    // formData.append('image', tire.image, tire.image.name);
    // formData.append('manufacture', tire.manufacture);
    // formData.append('location', tire.location.toString());
    // console.log("tire: ",tire);
    // this.restService.postWithFile("api/Image", formData,this.postImageCB.bind(this));
  }


  test() {

  }

}
