import { Component, OnInit, Renderer2 } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Vehicle } from '../../../model/vehicle';
import { ReportVM } from '../../../model/VM/reportVM';
import { ReportInputService } from '../../../services/report-input.service';
import { StringsService } from '../../../services/strings.service';
import { carNumberValidator } from '../../../validators/vehicle.validator';

@Component({
  selector: 'first-page',
  templateUrl: './first-page.component.html',
  styleUrls: ['./first-page.component.scss']
})
export class FirstPageComponent implements OnInit {

  public loading = false;
  public fg: FormGroup = new FormGroup({
    carNum: new FormControl('', [Validators.maxLength(12), carNumberValidator(), Validators.required]),
    km: new FormControl('', [Validators.required]),
    tireWidth: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,3}?)$/)]),
    tireHeight: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2}?)$/)]),
    tireDelimiter: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,2}?)$/)]),
    omesCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2,3}$/)]),
    speedCode: new FormControl('', [Validators.required, Validators.maxLength(1), Validators.pattern(/^([HIJKLMNPQRSTUVWXYZhijklmnpqrstuvxyz])$/)]),
    lisingcompany: new FormControl(''),
    fullName: new FormControl(''),
    phoneNum: new FormControl('')
  });
  public showTireSize = false;
  public showSpeedCodes = false;
  cuurentTireIdx


  constructor(private renderer: Renderer2, private router: Router, private activeRoute: ActivatedRoute, private reportInService: ReportInputService, private toastrService: NbToastrService, private stringsService: StringsService) {

  }

  ngOnInit(): void {
    // this.reportInService.resetReport();
    this.createFormGroups();

    if (this.reportInService.report) {
      this.setReportToView(this.reportInService.report);

    }
  }
  setTestData(){
    this.fg.get('carNum').setValue('7999672');
    this.fg.get('km').setValue(15000);
  }
  setReportToView(report: ReportVM) {
    if (report.vehicle) {
      if (report.vehicle.plateNum.length > 0) {
        this.fg.get('carNum').setValue(report.vehicle.plateNum);
        this.fg.get('km').setValue(report.vehicle.km);
        this.setTireSizeToView(report.vehicle.tireSize);
        this.fg.get('lisingcompany').setValue(report.leasingCompany);
        this.fg.get('fullName').setValue(report.user.firstName);
        this.fg.get('phoneNum').setValue(report.user.phoneNum);
      }
    }
  }
  createFormGroups() {
    this.fg = new FormGroup({
      carNum: new FormControl('', [Validators.maxLength(12), carNumberValidator(), Validators.required]),
      km: new FormControl('', [Validators.required]),
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



  focusOutFunction(controlerName) {
    if (controlerName == 'carNum') {
      if (this.fg.get(controlerName).valid) {
        this.GetVehicleByPlateNum();
      }
    } else if (controlerName == 'km') {
      if (this.fg.get(controlerName).valid) {
        let km = this.fg.get(controlerName).value;
      }
    }
  }
  GetVehicleByPlateNum() {
    this.loadVehicleData();
    this.loading = true;
    this.reportInService.GetVehicleByPlateNum(this.getVhicleByPlateNumCB.bind(this));
  }

  loadVehicleData() {
    if (this.reportInService.report.vehicle != null) {
      this.reportInService.report.vehicle.plateNum = this.fg.get('carNum').value;
      if (this.fg.get('km').value != null) {
        if (this.fg.get('km').value != "") {
          this.reportInService.report.vehicle.km = this.fg.get('km').value;
        }
      }
      this.reportInService.report.vehicle.tireSize = this.getTireSizeFromInput();
      this.reportInService.report.leasingCompany = this.fg.get('lisingcompany').value;
    }
    this.printReport();
  }
  getStatus(formControlName) {
    if (formControlName == 'carNum') {
    }
    if (this.fg.get(formControlName).valid) {
      return "info";
    }
    return "danger";
  }
  printReport() {
    this.reportInService.printReport();
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

  }
  GetVehicleFromGov() {
    let plateNum = this.fg.get('carNum').value;
    if (plateNum != null) {
      if (plateNum != "") {
        this.reportInService.GetVehicleFromGov(plateNum, this.vehicleGovCB.bind(this), this.vehicleGovFailed.bind(this));
      }
    }
  }
  vehicleGovCB(data) {

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
      // this.setCurrentTireByLocation(1);
      this.toastrService.info("הרכב נמצא במאגר הארצי");
    }
  }
  vehicleGovFailed(data) { }
  GetVhicleModelStr() {
    return this.stringsService.GetVhicleModelStr();
  }
  submitOnClick(event) {
    this.loadVehicleData();
    this.loadDriverData();
    this.reportInService.report.status = "לפני שליחה";

    this.router.navigate(['../second-page'], {
      relativeTo: this.activeRoute,
      queryParams: { carNum: this.reportInService.report }
    });
  }
  loadDriverData() {
    this.reportInService.report.user.firstName = this.fg.get('fullName').value;
    this.reportInService.SetPhoneNumber(this.fg.get('phoneNum').value);
  }
  isStageComplete() {
    return true;
  }
  vehicleArrived(vehicle) {

    this.reportInService.report.vehicle = vehicle;
    this.loadReportToView();
    this.loading = false;
  }
  loadReportToView() {
    this.setTireSizeToView(this.reportInService.report.vehicle.tireSize);
  }
  getTireSizeFromInput() {
    let retVal = "";
    if (this.fg.get('tireWidth').value) {
      retVal = this.fg.get('tireWidth').value + "/" + this.fg.get('tireHeight').value + "R" + this.fg.get('tireDelimiter').value + " " + this.fg.get('omesCode').value + this.fg.get('speedCode').value;
    }
    return retVal;
  }
  showTireSizeForms(){
    this.showTireSize = true;
    this.showSpeedCodes = true;
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
      } else {
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


  keytab(event, maxLength, nextElement) {
    if (event.target.value.length == maxLength) {
      const element = this.renderer.selectRootElement('#' + nextElement);
      setTimeout(() => element.focus(), 0);
    }
  }




}
