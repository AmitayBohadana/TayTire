import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { debounceTime, map } from 'rxjs/operators';

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

}