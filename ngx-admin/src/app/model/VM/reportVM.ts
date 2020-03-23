import { Report } from '../report';
import { Vehicle } from '../vehicle';
import { User } from '../user';
import { WorkEvent } from '../workEvent';



export class ReportVM extends Report {
  public vehicle:Vehicle = new Vehicle();
  /**
   *
   */
  constructor() {
    super();
    this.workEvents = new Array<WorkEvent>();
    this.user = new User();
  }
}
