import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';
import { RepairType } from '../model/repairType';
import { WorkEvent } from '../model/workEvent';
import { Tire } from '../model/tire';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TireService {


  public brandsOptions: string[];// = ['Michlin', 'Pirelli', 'Komho'];
  constructor(private httpService: HttpClient, private restService: RestService) { }


  search(term) {
    // this.restService.get("api/RepairType",this.repairTypeCB.bind(this));
    var listOfBooks = this.httpService.get('/api/tire/byName' , {params:{name:term}})
      .pipe(
        debounceTime(500),  // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
        map(
          (data: any) => {
            return (
              data
              // data.length != 0 ? data as any[] : [{ "BookName": "No Record Found" } as any]
            );
          }
        ));
    return listOfBooks;
  }

  createWorkEvent(type: RepairType,location) {
    let work = new WorkEvent();
    work.location = location;
    work.repairType = type;
    work.amount++;
    // if (type.code == 5) {
    //   item = type.item;

    // }
    return work;
  }

  generateWorkEvents() {
    let events = new Array<WorkEvent>();
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    events.push(this.generateWorkEvent());
    return events;
  }
  generateWorkEvent(): WorkEvent {
    let event = new WorkEvent();
    // event.Id ="4444";
    event.workDescription = "תיקון תקר";
    return event;
  }
  removeFromArray(arr: Array<any>, element) {
    let index: number = arr.indexOf(element);
    let deletedElement = null;
    if (index !== -1) {
      deletedElement = arr.splice(index, 1);
    }
    if (deletedElement != null) {
      return true;
    }
    return false;
  }




  generateTire() {
    let tire = new Tire();
    tire.manufacture = "michlin";
    tire.speedCode = "V";
    tire.tireSize = "175/65/15";
    return tire;
  }


}
