import { User } from './user';
import {Vehicle} from './vehicle';
import { WorkEvent } from './workEvent';

export class Report {
  public Id:string;
  public leasingCompany:string;
  public tireCompany:string;

  public user:User = new User();
  public vehicle:Vehicle = new Vehicle();
  public workEvents:Array<WorkEvent> = new Array<WorkEvent>();


  constructor() {
  }
}
