import { Tire } from './tire';

export class Vehicle {
  public Id:string;
public plateNum:string;
public manufacture:string;
public model:string;
public km:number;
public tireSize:string;
public tires: Array<Tire> = new Array<Tire>();
public numOfTires:number;

/**
 *
 */
constructor() {
  //temp
  this.numOfTires = 5;
  for(let i=0;i<this.numOfTires;i++){
    let tire = new Tire();
    this.tires.push(tire);
  }
  //
}

}
