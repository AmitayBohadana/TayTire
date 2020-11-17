import { Component } from '@angular/core';
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService } from '@nebular/theme';
import { takeUntil } from 'rxjs/operators';
import { BaseComponent } from './base/base.component';

import { MENU_ITEMS } from './pages-menu';




@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class PagesComponent extends BaseComponent{

  constructor(private menuService: NbMenuService,private breakpointService:NbMediaBreakpointsService, private sideBarService: NbSidebarService) {
    super();

    this.setSubscribers();
    }

    ngOnDestroy(): void {
      if (!this.subArray.closed) {
        this.subArray.unsubscribe();
      }
    }

  setSubscribers() {
    this.menuService.onItemSelect()
      .subscribe((event: { tag: string, item: any }) => {
        if (document.documentElement.clientWidth < 576) {
          this.sideBarService.collapse('menu-sidebar');
        }
      });

    // this.menuService.onItemSelect()
    //   .subscribe((event: { tag: string, item: any }) => {
    //     if (document.documentElement.clientWidth < 576) {
    //       this.sideBarService.collapse();
    //       console.log('this.menuservices.onitemselect');
    //       // document.getElementById("header-sidebar").classList.remove("expand");
    //     }
    //   });

  }
  menu = MENU_ITEMS;
}
