import { Injectable } from '@angular/core';
import { ReportInputService } from './report-input.service';

@Injectable({
  providedIn: 'root'
})
export class StringsService {

  constructor(private reportInputService:ReportInputService) {

  }

GetlVehicleFullTireSize(){
  return this.reportInputService.report.vehicle.tireSize;
}
  GetVhicleModelStr(){
    if(this.reportInputService.report.vehicle.manufacture && this.reportInputService.report.vehicle.model){
     return ""+this.reportInputService.report.vehicle.manufacture +" "+ this.reportInputService.report.vehicle.model;
    }else{
     return "";
    }

  }

}
