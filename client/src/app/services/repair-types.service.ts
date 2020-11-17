import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { RepairType } from '../model/repairType';

@Injectable({
  providedIn: 'root'
})
export class RepairTypesService {

  protected repairTypes:Array<RepairType> = new Array<RepairType>();
  constructor(private restService:RestService) {
    // this.requestData();
   }


  requestData(){
    this.restService.get("api/RepairType",this.repairTypeCB.bind(this));
   }
   GetRepairTypes(){
     return this.repairTypes;
   }
   repairTypeCB(data){

    this.repairTypes=data;
   }
}
