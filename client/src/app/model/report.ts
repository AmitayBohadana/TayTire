import { User } from './user';
import {Vehicle} from './vehicle';
import { WorkEvent } from './workEvent';

export class Report {
  public Id:string;
  public leasingCompany:string;
  public tireCompany:string;
  public vehicle_id:string;
  public vehicle_plate_num: string;
  public user:User;
  public workEvents:Array<WorkEvent>;
  public confirmationNum:string;
  public status:string;
  constructor() {

  }
}
