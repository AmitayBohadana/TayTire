import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../../../model/user';
import { Vehicle } from '../../../model/vehicle';
import { Tire } from '../../../model/tire';
import { WorkEvent } from '../../../model/workEvent';
import { carNumberValidator } from '../../../validators/vehicle.validator';
// import { UdpCurrencyMaskPipe } from '../../../@theme/pipes/UdpCurrencyMaskPipe';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';
import { Strings } from '../../../strings';
import { Subscription, Observable } from 'rxjs';
import { TireService } from '../../../services/tire.service';
import { BaseComponent } from '../../base/base.component';
import { ReportInputService } from '../../../services/report-input.service';
import { Router } from '@angular/router';
import { TiresStepperComponent } from '../tires-stepper/tires-stepper.component';
import { StringsService } from '../../../services/strings.service';

@Component({
  selector: 'ngx-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent extends BaseComponent implements OnInit, OnDestroy {
  @ViewChild(TiresStepperComponent, { static: false }) child;

  public reportState = 1;
  public currentTire: Tire;
  public currentRepairType: RepairType;
  public typesDialogOpen = false;
  public loading = false;
  public fg: FormGroup;
  public subArray: Subscription = new Subscription();
  public showTireSize = false;
  public showSpeedCodes = false;
  cuurentTireIdx

  myTireBrandsOptions = <any>[];
  filteredControlOptions$: Observable<string[]>;

  constructor(private router: Router, private reportInService: ReportInputService, private dialogService: NbDialogService,
    private repairTypesService: RepairTypesService, public stringsService: StringsService, private tireService: TireService, private toastrService: NbToastrService, private renderer: Renderer2) {
    super();



  }
  ngOnInit() {
    console.log("onInit!!")
    this.reportInService.resetReport();
    this.repairTypesService.requestData();
    this.createFormGroups();
  }

  ngOnDestroy(): void {
    if (!this.subArray.closed) {
      this.subArray.unsubscribe();
    }
  }
  open() {
  }
  GetVhicleModelStr() {
    return this.stringsService.GetVhicleModelStr();
  }
  hasVhicleModelStr() {
    return this.GetVhicleModelStr() != "";
  }
  createFormGroups() {
    this.fg = new FormGroup({
      carNum: new FormControl('', [Validators.maxLength(12), carNumberValidator(), Validators.required]),
      km: new FormControl('', [Validators.required]),
      // tireSize: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,3}(?:\.\d)?)(?:[/X](\d{1,2}(?:\.\d)?)?)?([RBDrbd])(\d{1,2}(?:\.\d)?)$/)]),
      tireWidth: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,3}?)$/)]),
      tireHeight: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2}?)$/)]),
      tireDelimiter: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2}?)$/)]),
      omesCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2,3}$/)]),
      speedCode: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/^([HIJKLMNPQRSTUVWXYZhijklmnpqrstuvxyz])$/)]),
      lisingcompany: new FormControl(''),
      fullName: new FormControl(''),
      phoneNum: new FormControl('')
    });
  }

  getTireSizeFromInput() {
    let retVal = "";
    if (this.fg.get('tireWidth').value) {
      retVal = this.fg.get('tireWidth').value + "/" + this.fg.get('tireHeight').value + "R" + this.fg.get('tireDelimiter').value + " " + this.fg.get('omesCode').value + this.fg.get('speedCode').value;
    }

    return retVal;
  }

  getRepairTypes() {
    return this.repairTypesService.GetRepairTypes();
  }

  submit() {
    // this.reportInService.SubmitReport();
  }
  GetReport() {
    return this.reportInService.report;
  }
  submitOnClick(event) {
    event.preventDefault();
    if (this.reportState == 1) {
      this.loadVehicleData();
      this.loadDriverData();
      this.reportInService.report.status = "לפני שליחה";
    }
    if (this.reportState < 3 && this.isStageComplete()) {

      this.reportState = this.reportState + 1;

    }
    console.log("rep: ", this.GetReport());
    // this.reportState = 2; //change it
  }


  GetNewReportByPlateNum() {
    this.loadVehicleData();
    // this.loading = true;
    this.reportInService.GetNewReportByPlateNum(this.newReportByPlateNumCB.bind(this));

  }
  GetVehicleByPlateNum() {
    this.loadVehicleData();
    this.loading = true;
    this.reportInService.GetVehicleByPlateNum(this.getVhicleByPlateNumCB.bind(this));
  }
  vehicleGovCB(data) {
    console.log("data: ", data);
    this.loading = false;
    let records = data.result.records;
    if (records.length == 1) {
      let vehicle = new Vehicle();
      let record = records[0];

      let tireSize = record.zmig_kidmi;
      let manufacture = record.tozeret_nm;
      let model = record.kinuy_mishari;
      this.reportInService.report.vehicle.tireSize = tireSize.trim();
      this.reportInService.report.vehicle.manufacture = manufacture;
      this.reportInService.report.vehicle.model = model;
      this.loadReportToView();
      this.setCurrentTireByLocation(1);
      this.toastrService.info("הרכב נמצא במאגר הארצי");
    }

  }
  vehicleGovFailed(data) {

  }
  GetVehicleFromGov() {
    let plateNum = this.fg.get('carNum').value;
    if (plateNum != null) {
      if (plateNum != "") {
        this.reportInService.GetVehicleFromGov(plateNum, this.vehicleGovCB.bind(this), this.vehicleGovFailed.bind(this));
      }
    }
  }
  backOnClick() {
    if (this.reportState > 1) {
      this.reportState = this.reportState - 1;
    }
    // this.reportState = 1; //change it
  }
  vehicleArrived(vehicle) {
    // let reportVm: ReportVM = new ReportVM();
    // reportVm.vehicle = vehicle;
    // this.reportInService.report = reportVm;
    this.reportInService.report.vehicle = vehicle;
    this.loadReportToView();
    this.setCurrentTireByLocation(1);
    this.loading = false;
  }
  getVhicleByPlateNumCB(vehicle) {
    let reportVm: ReportVM = new ReportVM();
    this.reportInService.report = reportVm;
    if (vehicle) {
      this.vehicleArrived(vehicle);

      this.toastrService.info("רכב זוהה במאגר");
    } else {
      this.GetVehicleFromGov();
    }
    // this.reportInService.report = reportVm;
    // this.loadReportToView();
    // this.setCurrentTireByLocation(1);
    // this.loading = false;
  }
  newReportByPlateNumCB(res) {
    let reportVm: ReportVM = res;
    this.reportInService.report = reportVm;
    this.loadReportToView();
    this.setCurrentTireByLocation(1);
    this.loading = false;
  }
  loadReportToView() {
    // this.fg.get('tireSize').setValue(this.reportInService.report.vehicle.tireSize);
    this.setTireSizeToView(this.reportInService.report.vehicle.tireSize);
  }
  focusOutFunction(controlerName) {
    if (controlerName == 'carNum') {
      if (this.fg.get(controlerName).valid) {
        // this.GetNewReportByPlateNum();
        this.GetVehicleByPlateNum();
        // this.GetVehicleFromGov();
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


  isStageComplete() {
    let res = true;
    if (this.reportState == 1) {
      res = this.fg.valid;
    }

    if (this.reportState == 2) {
      // res = this.reportInService.isStage2Complete;
    }
    if (this.reportState == 3) {
      res = false;
    }
    return res;
  }


  loadVehicleData() {
    if (this.reportInService.report.vehicle != null) {
      this.reportInService.report.vehicle.plateNum = this.fg.get('carNum').value;
      if (this.fg.get('km').value != null) {
        if (this.fg.get('km').value != "") {
          this.reportInService.report.vehicle.km = this.fg.get('km').value;
        }
      }
      // this.reportInService.report.vehicle.tireSize = this.fg.get('tireSize').value;
      this.reportInService.report.vehicle.tireSize = this.getTireSizeFromInput();
      this.reportInService.report.leasingCompany = this.fg.get('lisingcompany').value;
    }
    this.printReport();
  }
  loadDriverData() {
    this.reportInService.report.user.firstName = this.fg.get('fullName').value;
    this.reportInService.SetPhoneNumber(this.fg.get('phoneNum').value);
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

  test() {
    this.setTireSizeToView(this.getTireSizeFromInput());
  }
  setCurrentTire(tire: Tire) {
    this.currentTire = tire;

  }

  postImageCB(picId) {
    console.log("picId: ", picId);
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


  setDriverData(fullName: any, phoneNum: any) {
    this.reportInService.report.user.firstName = fullName;
    this.reportInService.SetPhoneNumber(phoneNum);
  }
  setVehicleData(plateNum: any, km: number, tireSize: string) {
    this.reportInService.report.vehicle.plateNum = plateNum;
    this.reportInService.report.vehicle.km = +km;
    this.reportInService.report.vehicle.tireSize = tireSize;
  }



  formDataInsert(stage) {
    if (stage == 1) {
      let vehicle: Vehicle = this.generateVehicle();
      this.fg.get('carNum').setValue(vehicle.plateNum);
      this.fg.get('km').setValue(vehicle.km);
      // this.fg.get('tireSize').setValue(vehicle.tireSize);
      this.setTireSizeToView(vehicle.tireSize);
      this.fg.get('fullName').setValue("someone");
      this.fg.get('phoneNum').setValue("051511111");

    }

  }
  keytab(event, maxLength, nextElement) {
    if (event.target.value.length == maxLength) {
      const element = this.renderer.selectRootElement('#' + nextElement);
      setTimeout(() => element.focus(), 0);
    }
  }

  setTireSizeToView(tireSize: string) {
    if (tireSize) {

      let tireSizeArr = tireSize.split(/[/R ]+/);
      if (tireSizeArr.length > 2) {
        let tireWidth = tireSizeArr[0];
        let tireHeight = tireSizeArr[1];
        let tireDelimiter = tireSizeArr[2];
        if (!tireWidth || !tireHeight || !tireDelimiter) {
          this.showTireSize = true;
        }
      this.fg.get('tireWidth').setValue(tireSizeArr[0]);
      this.fg.get('tireHeight').setValue(tireSizeArr[1]);
      this.fg.get('tireDelimiter').setValue(tireSizeArr[2]);
      }else{
        this.showTireSize = true;
      }
      if (tireSizeArr.length > 3) {
        let str = tireSizeArr[3];
        if (str != null) {
          let omes = str.substring(0, str.length - 1);
          let speedCode = str.substring(str.length - 1);
          if (!omes || !speedCode) {
            this.showSpeedCodes = true;

            if (speedCode != "") {

            }
          }
          this.fg.get('omesCode').setValue(omes);
          speedCode = speedCode.toUpperCase();
          this.fg.get('speedCode').setValue(speedCode);
        } else {
          this.showSpeedCodes = true;
        }
      } else {
        this.showSpeedCodes = true;
      }


    }

  }
  generateVehicle() {
    let vehicle = new Vehicle();
    // vehicle.Id="4444";
    vehicle.plateNum = "1111111";
    vehicle.km = 15000;
    vehicle.tireSize = "175/65R14 92V";

    vehicle.tires = new Array<Tire>();
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    vehicle.tires.push(this.tireService.generateTire());
    return vehicle;
  }

  getCurrentTire() {
    let tires: Array<Tire> = this.getTires();
    return tires[this.cuurentTireIdx];
  }
}
