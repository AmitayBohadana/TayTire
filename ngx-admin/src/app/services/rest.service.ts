import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, takeWhile } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';




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
  constructor(private http:HttpClient,private toastrService: NbToastrService) { }

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

      if(successCB != null){
        successCB(res);
      }
    },
    (reponse:HttpErrorResponse) => {

      this.displayErrorsToast(reponse.error.errors);
  });
  }
  postWithFile(api:string,dto:object,successCB?,faliedCB?,self?){
    let Options = {
      headers: new HttpHeaders({
        'Content-Disposition': 'multipart/form-data',
        'Accept':  'application/json'
      })
    };


    return this.http.post("/" +api,dto,Options).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      console.log("tire id: ",res);
      if(successCB != null){
        successCB(res);
      }
    },
    (reponse:HttpErrorResponse) => {

      this.displayErrorsToast(reponse.error.errors);
  });
  }
  displayErrorsToast(errors: JSON) {

    let values = Object.values(errors);
    console.log("vlues: ", values);
    values.forEach(fieldErrorMsgs =>{
      let arr:Array<any> = fieldErrorMsgs;
      arr.forEach(msg => {
        console.log(msg);
        this.toastrService.danger(msg);
      });
    });
  }

  get(api:string,successCB?,faliedCB?,self?){
    return this.http.get("/" +api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      successCB(res);

    });
  }
  get2(api:string){
    return this.http.get(endpoint+api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe(([map,config]:[any,any])=>{
      let res = map;

    });
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
