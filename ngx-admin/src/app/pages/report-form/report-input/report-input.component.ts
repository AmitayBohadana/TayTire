import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { Vehicle } from '../../../model/vehicle';
import { Tire } from '../../../model/tire';
import { WorkEvent } from '../../../model/workEvent';
import { carNumberValidator } from '../../../validators/vehicle.validator';
import { UdpCurrencyMaskPipe } from '../../../@theme/pipes/UdpCurrencyMaskPipe';
import { NbDialogService } from '@nebular/theme';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';
import { Strings } from '../../../strings';
import { Subscription, Observable } from 'rxjs';
import { TireService } from '../../../services/tire.service';
import { BaseComponent } from '../../base/base.component';
import { ReportInputService } from '../../../services/report-input.service';

@Component({
  selector: 'ngx-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent extends BaseComponent implements OnInit, OnDestroy {
  public reportState = 1;
  public currentTire: Tire;
  public currentRepairType: RepairType;
  public typesDialogOpen = false;
  public loading = false;
  public fg: FormGroup;
  public subArray: Subscription = new Subscription();
  cuurentTireIdx

  myTireBrandsOptions = <any>[];
  filteredControlOptions$: Observable<string[]>;

  constructor(private reportInService:ReportInputService, private currencyMask: UdpCurrencyMaskPipe, private dialogService: NbDialogService,
    private repairTypesService: RepairTypesService,private tireService:TireService) {
      super();
    repairTypesService.requestData();
    this.createFormGroups();

  }
  ngOnInit() {

  }

  ngOnDestroy(): void {
    if (!this.subArray.closed) {
      this.subArray.unsubscribe();
    }
  }
  open() {
  }
  createFormGroups() {
    this.fg = new FormGroup({
      carNum: new FormControl('', [Validators.maxLength(12), carNumberValidator(), Validators.required]),
      km: new FormControl('', [Validators.required]),
      tireSize: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,3}(?:\.\d)?)(?:[/X](\d{1,2}(?:\.\d)?)?)?([RBDrbd])(\d{1,2}(?:\.\d)?)$/)]),
      speedCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2,3}([LMNPQRSTUVWXYZ])$/)]),
      fullName: new FormControl('', [Validators.required]),
      phoneNum: new FormControl('', [Validators.required])
    });
  }

  getTireSizeFromInput(){
    return this.fg.get('tireSize').value;
  }
  getRepairTypes() {
    return this.repairTypesService.GetRepairTypes();
  }

  submit() {
    this.reportInService.SubmitReport();
  }

  submitOnClick(){
    this.loadVehicleData();
    this.loadDriverData();
    this.reportState = 2; //change it
  }

  GetNewReportByPlateNum() {
    this.loadVehicleData();
    // this.loading = true;
    this.reportInService.GetNewReportByPlateNum(this.newReportByPlateNumCB.bind(this));
  }
  backOnClick(){
    this.reportState = 1; //change it
  }
  newReportByPlateNumCB(res) {
    let reportVm: ReportVM = res;
    this.reportInService.report = reportVm;
    this.loadReportToView();
    this.setCurrentTireByLocation(1);
    this.loading = false;
  }
  loadReportToView() {
    this.fg.get('tireSize').setValue(this.reportInService.report.vehicle.tireSize);
  }
  focusOutFunction(controlerName) {
    if (controlerName == 'carNum') {
      if (this.fg.get(controlerName).valid) {
        this.GetNewReportByPlateNum();
      }
    } else if (controlerName == 'km') {
      if (this.fg.get(controlerName).valid) {
        let km = this.fg.get(controlerName).value;
      }
    }
  }
  successCB(res) {
  }

  switch(bol: boolean): boolean {
    if (bol) {
      return false;
    }
    return true;
  }

  isStageComplete(){
    return this.fg.valid;
  }

  loadVehicleData() {
    if (this.reportInService.report.vehicle != null) {
      this.reportInService.report.vehicle.plateNum = this.fg.get('carNum').value;
      if (this.fg.get('km').value != null) {
        if (this.fg.get('km').value != "") {
          this.reportInService.report.vehicle.km = this.fg.get('km').value;
        }
      }
      this.reportInService.report.vehicle.tireSize = this.fg.get('tireSize').value;
    }
    this.printReport();
  }
  loadDriverData() {
    this.reportInService.report.user.firstName = this.fg.get('fullName').value;
    this.reportInService.report.user.phoneNum = this.fg.get('phoneNum').value;
  }
  printReport() {
    this.reportInService.printReport();
  }


  generateUser() {
    let user = new User();
    user.firstName = "Amitay";
    user.lastName = "בוהדנה";
    user.phoneNum = "0625821583";
    return user;
  }
  getTires() {
    return this.reportInService.report.vehicle.tires;
  }
  prevTire(currentTire) {
    this.setCurrentTireByLocation(currentTire.location - 1);
  }
  tireSubmit(tire: Tire) {
    this.setCurrentTireByLocation(tire.location + 1);
  }

  nextTire() {
    this.currentRepairType = null;
  }

  setCurrentTireByLocation(location) {
    let tires = this.getTires();
    tires.forEach(tire => {
      if (tire.location == location) {
        this.setCurrentTire(tire);
      }
    });
  }

  test(){
  }
  setCurrentTire(tire: Tire) {
    this.currentTire = tire;

  }

  postImageCB(picId){
    console.log("picId: ",picId);
  }

  newWorkEvent(type: RepairType) {
    let work = new WorkEvent();
    work.location = this.currentTire.location;

    work.repairType = type;
    work.amount++;
    if (type.code == 5) {
      work.item = "Michlin";
    }
    this.reportInService.report.workEvents.push(work);
  }



  getStatus(stage, formControlName) {
    let formGroup: FormGroup = this.getFormGroupByStage(stage);
    if (formControlName == 'carNum') {
    }
    if (formGroup.get(formControlName).valid) {
      return "info";
    }
    return "danger";
  }


  getFormGroupByStage(stage) {
    if (stage == 1) {
      return this.fg;
    }
  }
  tireHeadLine(tire) {
    return "צמיג " + Strings.tireLocations[tire.location - 1];
  }
  stage1complete() {
    let plateNum = this.fg.get('carNum').value;
    let km = this.fg.get('km').value;
    let tireSize = this.fg.get('tireSize').value + " " + this.fg.get('speedCode').value;
    this.setVehicleData(plateNum, km, tireSize); //to it only in the end
    this.printReport();
  }

  setDriverData(fullName: any, phoneNum: any) {
    this.reportInService.report.user.firstName = fullName;
    this.reportInService.report.user.phoneNum = phoneNum;
  }
  setVehicleData(plateNum: any, km: number, tireSize: string) {
    this.reportInService.report.vehicle.plateNum = plateNum;
    this.reportInService.report.vehicle.km = +km;
    this.reportInService.report.vehicle.tireSize = tireSize;
  }

  setSubscribers() {
    this.fg.valueChanges.subscribe(val => {

      if (typeof val.km === 'string') {
        const maskedVal = this.currencyMask.transform(val.km);
        if (val.km !== maskedVal) {
          this.fg.patchValue({ amount: maskedVal });
        }
      }
    });

  }

  formDataInsert(stage) {
    if (stage == 1) {
      let vehicle: Vehicle = this.generateVehicle();
      this.fg.get('carNum').setValue(vehicle.plateNum);
      this.fg.get('km').setValue(vehicle.km);
      this.fg.get('tireSize').setValue(vehicle.tireSize);
      this.fg.get('speedCode').setValue("92V");
      this.fg.get('fullName').setValue("someone");
      this.fg.get('phoneNum').setValue("051511111");

    }

  }
  generateVehicle() {
    let vehicle = new Vehicle();
    // vehicle.Id="4444";
    vehicle.plateNum = "1111111";
    vehicle.km = 15000;
    vehicle.tireSize = "175/65R14";

    vehicle.tires = new Array<Tire>();
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    return vehicle;
  }

  getCurrentTire(){
    let tires:Array<Tire> = this.getTires();
    return tires[this.cuurentTireIdx];
  }
}
