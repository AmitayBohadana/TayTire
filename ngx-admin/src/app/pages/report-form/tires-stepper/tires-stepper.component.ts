import { Component, OnInit } from '@angular/core';
import { Strings } from '../../../strings';
import { ReportInputService } from '../../../services/report-input.service';

@Component({
  selector: 'ngx-tires-stepper',
  templateUrl: './tires-stepper.component.html',
  styleUrls: ['./tires-stepper.component.scss']
})
export class TiresStepperComponent implements OnInit {

  public tireLocation = 1;
  constructor(private reportInService:ReportInputService) { }

  ngOnInit(): void {
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
    if(this.tireLocation > 1){
      this.tireLocation = this.tireLocation-1;
    }
  }
  nextTire(){
    if(this.tireLocation < this.reportInService.GetNumOfTires()){
      this.tireLocation = this.tireLocation+1;
    }
  }
  tireSubmit(){
    this.nextTire();
  }


}
