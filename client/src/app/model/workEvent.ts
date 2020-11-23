import { Strings } from '../strings';
import { RepairType } from './repairType';

export class WorkEvent {
public Id:string;
public workDescription:string;
public repairType:RepairType;
public amount:number;
public location:number;
// public item:string;

/**
 *
 */
constructor() {
  this.amount = 0;
}


}
