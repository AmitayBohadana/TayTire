import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'ngx-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit,OnDestroy {
  public subArray: Subscription = new Subscription();
  constructor() { }


  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if (!this.subArray.closed) {
      this.subArray.unsubscribe();
    }
  }

}
