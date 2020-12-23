import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RepairTypesService } from '../../services/repair-types.service';

@Component({
  selector: 'report-input',
  templateUrl: './report-input.component.html',
  styleUrls: ['./report-input.component.scss']
})
export class ReportInputComponent implements OnInit {
  route;
  constructor(private router:Router,private repairTypesService:RepairTypesService) {
    this.route = this.router.url;
    console.log("route ",this.route);
    this.repairTypesService.requestData();
   }

  ngOnInit(): void {
  }

  backOnClick(){

  }
  isStageComplete(){
    return true;
  }


  submitOnClick(event){
    this.router.navigate(['../second-page'], { relativeTo: this.route });
    // this.router.navigate(['./child'], { relativeTo: this.route });

  }
}
