import { Component, OnInit, OnDestroy } from '@angular/core';
import { ReportVM } from '../../../model/VM/reportVM';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RestService } from '../../../services/rest.service';
import { Book } from '../../../model/Book';
import { User } from '../../../model/user';
import { Vehicle } from '../../../model/vehicle';
import { Tire } from '../../../model/tire';
import { WorkEvent } from '../../../model/workEvent';
import { carNumberValidator } from '../../../validators/vehicle.validator';
import { UdpCurrencyMaskPipe } from '../../../@theme/pipes/UdpCurrencyMaskPipe';
import { NbDialogService } from '@nebular/theme';
import { RepairTypesService } from '../../../services/repair-types.service';
import { RepairType } from '../../../model/repairType';
import { tireSizeValidator } from '../../../validators/tireSize.validator';
import { Strings } from '../../../strings';
import { ToNumberPipe } from '../../../@theme/pipes/toNumber.pipe';
import { ShowcaseDialogComponent } from '../../modal-overlays/dialog/showcase-dialog/showcase-dialog.component';
import { RepairChoiseModalComponent } from '../../modal-overlays/repair-choise-modal/repair-choise-modal.component';
import { Subscription, Observable, of } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { TireService } from '../../../services/tire.service';
import { TireBrand } from '../../../model/TireBrand';
import { TirePic } from '../../../model/TirePic';



@Component({
  selector: 'ngx-report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent implements OnInit, OnDestroy {

  public report: ReportVM = new ReportVM();
  public reportState = 1;
  public currentTire: Tire;
  public currentRepairType: RepairType;
  public typesDialogOpen = false;
  public loading = false;
  public stage1form: FormGroup;
  public stage2form: FormGroup;
  public stage3form: FormGroup;
  public subArray: Subscription = new Subscription();

  myTireBrandsOptions = <any>[];
  filteredControlOptions$: Observable<string[]>;

  constructor(private restService: RestService, private currencyMask: UdpCurrencyMaskPipe, private dialogService: NbDialogService,
    private repairTypesService: RepairTypesService, private toNumPipe: ToNumberPipe,private tireService:TireService) {
    repairTypesService.requestData();
    this.createFormGroups();

  }
  ngOnInit() {
    this.subArray.add(this.stage3form.get('manufacture').valueChanges.subscribe(
      term => {
        console.log("value changedL ",term);

        if(term){
          this.tireService.search(term).subscribe(
            data => {

              this.myTireBrandsOptions = data as any[];
              this.filteredControlOptions$ = of(this.myTireBrandsOptions);
          })
        }
    }))
  }

  ngOnDestroy(): void {
    if (!this.subArray.closed) {
      this.subArray.unsubscribe();
    }
  }

  private filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    // return this.tireService.brandsOptions.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
    return this.myTireBrandsOptions.filter(optionValue => optionValue.toLowerCase().includes(filterValue));
  }



  open() {

  }


  createFormGroups() {
    this.stage1form = new FormGroup({
      carNum: new FormControl('', [Validators.maxLength(12), carNumberValidator(), Validators.required]),
      km: new FormControl('', [Validators.required]),
      tireSize: new FormControl('', [Validators.required, Validators.pattern(/^(\d{1,3}(?:\.\d)?)(?:[/X](\d{1,2}(?:\.\d)?)?)?([RBD])(\d{1,2}(?:\.\d)?)$/)]),
      speedCode: new FormControl('', [Validators.required, Validators.pattern(/^\d{2,3}([LMNPQRSTUVWXYZ])$/)])
      // ,omesCode: new FormControl('',[Validators.required])
    });
    this.stage2form = new FormGroup({
      fullName: new FormControl('', [Validators.required]),
      phoneNum: new FormControl('', [Validators.required])
    });
    this.stage3form = new FormGroup({
      manufacture: new FormControl('', [Validators.required]),
      speedCode: new FormControl('', [Validators.required]),
      // omesCode: new FormControl('',[Validators.required]),
      repairType: new FormControl('', [Validators.required]),
      image: new FormControl('', [Validators.required])
    });
  }
  loadTireToView(tire: Tire) {
    this.stage3form.reset();
    this.stage3form.get('manufacture').setValue(tire.manufacture);
    this.stage3form.get('speedCode').setValue(tire.speedCode);
    // this.stage3form.get('omesCode').setValue(tire.omesCode);
  }
  loadViewToTire(tire) {
    tire.manufacture = this.stage3form.get('manufacture').value;
    tire.speedCode = this.stage3form.get('speedCode').value;
    // tire.omesCode = this.stage3form.get('omesCode').value;
  }
  getRepairTypes() {
    return this.repairTypesService.GetRepairTypes();
  }

  submit() {

    this.loadVehicleData();
    this.loadDriverData();
    this.loadWorkEventData();
    // this.report.user = this.generateUser();
    this.restService.post("api/Report1", this.report);
    // this.restService.post("api/Report1/GetReportByPlateNum",this.report);


    // this.restService.get("api/RepairType",this.successCB.bind(this));
    // this.restService.get2("report1");
  }
  // getReportByCarNum(){

  //   this.loadVehicleData();
  //   this.restService.post("api/Report1/GetReportByPlateNum",this.report,this.successCB.bind(this));
  // }

  GetNewReportByPlateNum() {
    this.loadVehicleData();
    // this.loading = true;
    this.restService.post("api/Report1/GetNewReportByPlateNum", this.report, this.newReportByPlateNumCB.bind(this));
  }


  loadWorkEventData() {

  }
  newReportByPlateNumCB(res) {
    let reportVm: ReportVM = res;
    this.report = reportVm;
    this.loadReportToView();
    this.setCurrentTireByLocation(1);
    this.loading = false;
  }
  loadReportToView() {
    this.stage1form.get('tireSize').setValue(this.report.vehicle.tireSize);
  }
  focusOutFunction(controlerName) {
    if (controlerName == 'carNum') {
      if (this.stage1form.get(controlerName).valid) {
        this.GetNewReportByPlateNum();
      }
    } else if (controlerName == 'km') {
      if (this.stage1form.get(controlerName).valid) {
        let km = this.stage1form.get(controlerName).value;

        // let kmWIthComma = km.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        // this.stage1form.get(controlerName).setValue(kmWIthComma);
      }




    }
  }
  successCB(res) {



  }
  openRepairTypesDialog(tire) {
    this.open();
    let sub = this.dialogService.open(RepairChoiseModalComponent, {
      context: {
        repairTypes: this.getRepairTypes(),
      },
    });
    this.subArray.add(sub.onClose.subscribe(repairType => repairType && this.repairSubmit(repairType)));

    this.currentTire = tire;
    this.typesDialogOpen = true;
  }
  removeRepairType(tire: Tire, workEvent: WorkEvent) {
    this.removeWorkEvent(workEvent);
  }

  isNewTireType(workEvent: WorkEvent) {
    if (workEvent.repairType.code == 5) {
      return true;
    }
    else {
      return false;
    }
  }
  switch(bol: boolean): boolean {
    if (bol) {
      return false;
    }
    return true;
  }

  // open() {
  //   this.dialogService.open(ShowcaseDialogComponent, {
  //     context: {
  //       title: 'This is a title passed to the dialog component',
  //     },
  //   });
  // }

  generateWorkEvents() {
    let events = new Array<WorkEvent>();
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    return events;
  }
  stageComplete(stageNum) {
    if (stageNum == 1) {
      return this.stage1form.valid;
    } else if (stageNum == 2) {
      return this.stage2form.valid;
    }
  }
  generateWorkEvent(): WorkEvent {
    let event = new WorkEvent();
    // event.Id ="4444";
    event.workDescription = "תיקון תקר";
    return event;
  }
  getWorkEvents(tire: Tire) {
    let events = new Array<WorkEvent>();
    this.report.workEvents.forEach(event => {
      if (event.location == tire.location) {
        events.push(event);

      }
    });
    return events;
  }
  loadVehicleData() {
    if (this.report.vehicle != null) {
      this.report.vehicle.plateNum = this.stage1form.get('carNum').value;
      if (this.stage1form.get('km').value != null) {
        if (this.stage1form.get('km').value != "") {

          // let kmstr = this.stage1form.get('km').value;
          // let km = kmstr.replace(',', '');
          // this.report.vehicle.km = km;
          this.report.vehicle.km = this.stage1form.get('km').value;
        }
      }

      this.report.vehicle.tireSize = this.stage1form.get('tireSize').value;
    }
    this.printReport();
  }
  loadDriverData() {
    this.report.user.firstName = this.stage2form.get('fullName').value;
    this.report.user.phoneNum = this.stage2form.get('phoneNum').value;
  }
  printReport() {
    console.log("report: ", this.report);
  }

  generateTire() {
    let tire = new Tire();
    tire.manufacture = "michlin";
    // tire.omesCode="98";
    tire.speedCode = "V";
    tire.tireSize = "175/65/15";
    return tire;
  }
  generateUser() {
    let user = new User();
    // user.Id = "203314521";
    user.firstName = "Amitay";
    user.lastName = "בוהדנה";
    user.phoneNum = "0625821583";
    return user;
  }
  getTires() {
    return this.report.vehicle.tires;
  }
  prevTire(currentTire) {
    this.setCurrentTireByLocation(currentTire.location - 1);
  }
  tireSubmit(tire: Tire) {
    this.loadViewToTire(tire);
    this.setCurrentTireByLocation(tire.location + 1);
  }

  nextTire() {


    this.currentRepairType = null;
  }
  resetTirePage(){
    this.stage3form.reset();
    this.myTireBrandsOptions = [];
  }
  setCurrentTireByLocation(location) {
    let tires = this.getTires();
    tires.forEach(tire => {
      if (tire.location == location) {
        this.setCurrentTire(tire);
        this.loadTireToView(this.currentTire);
      }
    });
  }
//   handleFileInput(files: FileList) {
//     this.fileToUpload = files.item(0);
// }
  test(){
    console.log("value: ",this.stage3form.get('image').value);
  }
  setCurrentTire(tire: Tire) {
    this.currentTire = tire;

  }
  public addFile(element,tire:Tire) {
  const formData = new FormData();
  let tirePic = new TirePic();
  tire.image = element.target.files.item(0);

  formData.append('image', tire.image, tire.image.name);
  formData.append('manufacture', tire.manufacture);
  formData.append('location', tire.location.toString());
  console.log("tire: ",tire);
  this.restService.postWithFile("api/Image", formData,this.postImageCB.bind(this));
  }
  postImageCB(picId){
    console.log("picId: ",picId);
  }
  repairSubmit(type) {

    this.stage3form.get('repairType').setValue(type.type);

    // this.currentRepairType = type;
    if (this.currentTire != null) {

      this.newWorkEvent(type);
    }
    this.typesDialogOpen = false;
  }
  newWorkEvent(type: RepairType) {
    let work = new WorkEvent();
    work.location = this.currentTire.location;

    work.repairType = type;
    work.amount++;
    if (type.code == 5) {
      work.item = "Michlin";
    }
    this.report.workEvents.push(work);
  }
  removeWorkEvent(workEvent: WorkEvent) {
    this.removeFromArray(this.report.workEvents, workEvent);
  }
  removeFromArray(arr: Array<any>, element) {
    let index: number = arr.indexOf(element);
    let deletedElement = null;
    if (index !== -1) {
      deletedElement = arr.splice(index, 1);
    }
    if (deletedElement != null) {
      return true;
    }
    return false;
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

  // getTireSizeFromControl(){
  //   let fcVal=this.stage1form.get('tireSize').value;

  //   let retVal="";
  //   let numvVal = this.toNumPipe.transform(fcVal);
  //   retVal = this.tireSizeTransform(numvVal);

  //   return retVal;
  // }

  // tireSizeTransform(tireSizeNum) {

  //   let retVal = "";
  //   // var x1 = tireSizeNum;
  //   // // var x2 = x.length > 1 ? '.' + x[1] : '';
  //   // var rgx = /(\d{3})(\d+)/;
  //   // while (rgx.test(x1)) {
  //   //     x1 = x1.replace(rgx,'/'+'$1'  );


  //   let numvVal:string = this.toNumPipe.transform(tireSizeNum).toString();
  //   let start="";
  //   let middle="";
  //   let end="";

  //   if(numvVal.length >= 5 && middle == ""){
  //     middle = numvVal.substring(3,5) +"R";
  //   }
  //   if(numvVal.length >= 3){
  //     start = start + "/";
  //   }else{
  //     start = numvVal;
  //   }




  //   // }

  //   return start+middle+end;
  // }
  getFormGroupByStage(stage) {
    if (stage == 1) {
      return this.stage1form;
    } else if (stage === 2) {
      return this.stage2form;
    } else if (stage === 3) {
      return this.stage3form;
    }
  }
  tireHeadLine(tire) {
    return "צמיג " + Strings.tireLocations[tire.location - 1];
  }
  stage1complete() {
    let plateNum = this.stage1form.get('carNum').value;
    let km = this.stage1form.get('km').value;
    let tireSize = this.stage1form.get('tireSize').value + " " + this.stage1form.get('speedCode').value;
    this.setVehicleData(plateNum, km, tireSize); //to it only in the end
    this.printReport();
  }
  stage2complete() {
    let fullName = this.stage2form.get('fullName').value;
    let phoneNum = this.stage2form.get('phoneNum').value;
    this.setDriverData(fullName, phoneNum); //to it only in the end
    this.printReport();
    this.reportState = 2;
  }
  setDriverData(fullName: any, phoneNum: any) {
    this.report.user.firstName = fullName;
    this.report.user.phoneNum = phoneNum;
  }
  setVehicleData(plateNum: any, km: number, tireSize: string) {
    this.report.vehicle.plateNum = plateNum;
    this.report.vehicle.km = +km;
    this.report.vehicle.tireSize = tireSize;
  }

  setSubscribers() {
    this.stage1form.valueChanges.subscribe(val => {

      if (typeof val.km === 'string') {
        const maskedVal = this.currencyMask.transform(val.km);
        if (val.km !== maskedVal) {
          this.stage1form.patchValue({ amount: maskedVal });
        }
      }
    });

  }






  formDataInsert(stage) {
    if (stage == 1) {
      let vehicle: Vehicle = this.generateVehicle();
      this.stage1form.get('carNum').setValue(vehicle.plateNum);
      this.stage1form.get('km').setValue(vehicle.km);
      this.stage1form.get('tireSize').setValue(vehicle.tireSize);
      this.stage1form.get('speedCode').setValue("92V");

    }
    if (stage == 2) {
      this.stage2form.get('fullName').setValue("מישהו");
      this.stage2form.get('phoneNum').setValue("051511111");
    }
  }


  generateVehicle() {
    let vehicle = new Vehicle();
    // vehicle.Id="4444";
    vehicle.plateNum = "1111111";
    vehicle.km = 15000;
    vehicle.tireSize = "175/65R14";

    vehicle.tires = new Array<Tire>();
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    vehicle.tires.push(this.generateTire());
    return vehicle;
  }


}
