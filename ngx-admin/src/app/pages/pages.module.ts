import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { ECommerceModule } from './e-commerce/e-commerce.module';
import { PagesRoutingModule } from './pages-routing.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { ReportFormModule } from './report-form/report-form.module';
import { RepairTypesDialogComponent } from './repair-types-dialog/repair-types-dialog.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    ECommerceModule,
    MiscellaneousModule,
    ReportFormModule,
    NbSidebarModule,
    NbLayoutModule
  ],
  declarations: [
    PagesComponent,
    RepairTypesDialogComponent,
    BaseComponent
  ],
})
export class PagesModule {
}
