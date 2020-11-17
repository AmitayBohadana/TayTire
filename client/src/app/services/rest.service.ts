import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError, tap, takeWhile } from 'rxjs/operators';
import { NbToastrService } from '@nebular/theme';




const endpoint = 'http://localhost/';
const headers = new HttpHeaders({
  'Content-Type':  'application/json',
  'Accept':  'application/json'
});
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
  getFromGov(api:string,plateNum,successCB?,faliedCB?,self?){
    console.log("params value :",plateNum)
    // let params:HttpParams = new HttpParams().append('data', value);
    // // params.append("someParamKey", this.someParamValue);
    // // httpOptions.params =
    // return this.http.get(api,{headers, params}).pipe(takeWhile(()=>this.alive))
    // .subscribe((res)=>{
    //   successCB(res);
    // });

    return this.http.get("https://data.gov.il/api/action/datastore_search?resource_id=053cea08-09bc-40ec-8f7a-156f0677aff3&limit=5&q="+plateNum).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      successCB(res);
    });
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
      console.log("resopone: ",reponse);
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
      console.log("tire id: ");
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
  get3(api:string,successCB?,faliedCB?,self?){
    return this.http.get(endpoint +api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe((res)=>{
      successCB(res);
    });
  }

  get2(api:string){
    return this.http.get(endpoint+api,httpOptions).pipe(takeWhile(()=>this.alive))
    .subscribe(([map,config]:[any,any])=>{
      let res = map;
      console.log("res: ",res)
    });
  }
  private extractData(res: Response) {
    let body = res;
    return body || { };
  }
}
