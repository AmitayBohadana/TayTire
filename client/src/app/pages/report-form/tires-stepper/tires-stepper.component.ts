import { Component, OnInit, ViewChild } from '@angular/core';
import { Strings } from '../../../strings';
import { ReportInputService } from '../../../services/report-input.service';
import { TireFormComponent } from '../tire-form/tire-form.component';

@Component({
  selector: 'ngx-tires-stepper',
  templateUrl: './tires-stepper.component.html',
  styleUrls: ['./tires-stepper.component.scss']
})
export class TiresStepperComponent implements OnInit {

  @ViewChild(TireFormComponent, {static: false}) child;
  public tireLocation = 1;

  constructor(private reportInService:ReportInputService) { }

  ngOnInit(): void {
    // window.scrollTo(0, 0);

  }
  getNextButtomName(){
    if(this.tireLocation == this.reportInService.GetNumOfTires()){
      return "סיום";
    }
    return "צמיג הבא";
  }
  getSelectedLocation(){
    return this.tireLocation;
  }
  setTireLocation(location){
    this.child.submit();
    this.tireLocation = location;
  }
  tireHeadLine(tire) {
    return "צמיג " + Strings.tireLocations[tire.location - 1];
  }

  GetCurrentTire(){
    return this.reportInService.GetTireByLocation(this.tireLocation);
  }

  getTires() {
    return this.reportInService.report.vehicle.tires;
  }
  prevTire(){
    this.child.submit();
    if(this.tireLocation > 1){
      this.tireLocation = this.tireLocation-1;
    }
  }
  nextTire(){
    this.child.submit();
    if(this.tireLocation < this.reportInService.GetNumOfTires()){
      this.tireLocation = this.tireLocation+1;

    }else if(this.tireLocation == this.reportInService.GetNumOfTires()){

    }

  }
  tireSubmit(){
    let tire = this.GetCurrentTire();
    this.nextTire();
  }


}
