import { Component } from '@angular/core';
import { NbSidebarService } from '@nebular/theme';

@Component({
  selector: 'ngx-one-column-layout',
  styleUrls: ['./one-column.layout.scss'],
  template: `
    <nb-layout windowMode>
      <nb-layout-header>
        <ngx-header></ngx-header>
      </nb-layout-header>

      <nb-sidebar class="menu-sidebar" tag="menu-sidebar" responsive start>
        <ng-content select="nb-menu"></ng-content>
      </nb-sidebar>

      <nb-layout-column (click)="this.mainLayoutClicked();$event.stopPropagation()" >
        <ng-content select="router-outlet"></ng-content>
      </nb-layout-column>

      <nb-layout-footer fixed>
        ContactUs
      </nb-layout-footer>
    </nb-layout>
  `,
})
export class OneColumnLayoutComponent {
  /**
   *
   */
  constructor(private sideBarService: NbSidebarService) {


  }



  mainLayoutClicked() {

    if (document.documentElement.clientWidth < 576) {
      this.sideBarService.collapse('menu-sidebar');
    }
    return false;
  }

}
