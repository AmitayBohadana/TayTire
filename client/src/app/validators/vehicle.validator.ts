import { ValidatorFn, AbstractControl } from '@angular/forms';
import { control } from 'leaflet';

export function carNumberValidator(): ValidatorFn{
  return (control:AbstractControl) : {[key:string]:any} | null =>{
    let carNum = control.value;
    if(control.value != 15){
      return null;
    }
    return {validationError: "מספר רכב אינו תקין"};
  }
}
