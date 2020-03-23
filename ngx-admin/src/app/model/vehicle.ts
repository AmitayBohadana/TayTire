import { Tire } from './tire';

export class Vehicle {
  public Id:string;
public plateNum:string;
public manufacture:string;
public model:string;
public km:number = 1;
public tireSize:string;
// public carTires: { [key: number]: Tire; } = {};
//public carTires: Map<number,Tire> = new Map<number,Tire>();
public tires: Array<Tire> = new Array<Tire>();
public numOfTires:number;

/**
 *
 */
constructor() {
  this.plateNum ="";
  this.numOfTires = 5;
  for(let i=0;i<this.numOfTires;i++){
    let tire = new Tire();
    tire.location = i+1;
    this.tires.push(tire);
    //this.carTires.set(i+1,tire);
  }
  //
}

}
