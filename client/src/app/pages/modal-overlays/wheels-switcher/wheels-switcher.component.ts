import { Component, OnInit, Output } from '@angular/core';
import { ReportInputService } from '../../../services/report-input.service';
import { Tire } from '../../../model/tire';
import { NbDialogRef } from '@nebular/theme';

@Component({
  selector: 'ngx-wheels-switcher',
  templateUrl: './wheels-switcher.component.html',
  styleUrls: ['./wheels-switcher.component.scss']
})
export class WheelsSwitcherComponent implements OnInit {

@Output() tires:Array<Tire>;
public currentTire:Tire;
public numOfSwitches:number = 0;
public flags:Array<boolean> = new Array<boolean>();
  constructor(protected ref: NbDialogRef<WheelsSwitcherComponent>,private reportInService: ReportInputService) { }

  ngOnInit(): void {

    this.tires = this.reportInService.report.vehicle.tires.map(x => Object.assign({}, x));;
    this.tires.forEach(tire=>{
      this.flags.push(false);
    });
  }

  wheelOnClick(tire){
    if(this.currentTire == null){
      this.currentTire = tire;
    }else{
      this.switchWheels(tire);
      // this.calcNumOfSwitches();
    }
  }
  isEven(n) {
    return n % 2 == 0;
 }

 isOdd(n) {
    return Math.abs(n % 2) == 1;
 }
  calcNumOfSwitches() {
    let num = 0;
    for(let i=0;i<this.reportInService.report.vehicle.tires.length;i++){
      if(this.reportInService.report.vehicle.tires[i].location != this.tires[i].location){
        num = num + 1;
      }
    }
    if(num > 1){
      if(this.isOdd(num)){
        this.numOfSwitches = num/2 + 0.5;
      }else{
        this.numOfSwitches = num/2;
      }

    }

  }
  submit(){
    this.ref.close({tires: this.tires,numOfSwitches: this.numOfSwitches});
  }
  IsSpairTire(tire:Tire){
    let retVal = false;
    if(this.tires){
      let lastTire = this.tires[this.tires.length-1];
    if(tire.location == lastTire.location){
      retVal = true;
    }
    }

    return retVal;
  }
  GetNumOfSwitches(){
    this.calcNumOfSwitches();
  return this.numOfSwitches;
  }
  switchWheels(tire: Tire) {
  let temp = tire.location;
  tire.location = this.currentTire.location;
  this.currentTire.location = temp;
  this.currentTire = null;


  }


}
