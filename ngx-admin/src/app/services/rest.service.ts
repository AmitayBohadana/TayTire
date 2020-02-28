import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, takeWhile } from 'rxjs/operators';




const endpoint = 'https://localhost:44363/api/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Accept':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class RestService implements OnDestroy {

  protected alive = true;
  constructor(private http:HttpClient) { }

  ngOnDestroy(): void {
    this.alive = false;
  }

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'products').pipe(
      map(this.extractData));
  }
  post(api:string,dto:object,successCB?,faliedCB?,self?){
    return this.http.post("/" +api,dto,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      console.log("server res: ",res);
    });
  }

  get(api:string,successCB?,faliedCB?,self?){
    return this.http.get("/" +api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      successCB(res);
      console.log("server res: ",res);
    });
  }
  get2(api:string){
    return this.http.get(endpoint+api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe(([map,config]:[any,any])=>{
      let res = map;
      console.log("server res: ",res);
    });
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
