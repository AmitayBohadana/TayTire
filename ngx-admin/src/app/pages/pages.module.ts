import { NgModule } from '@angular/core';
import { NbMenuModule, NbLayoutModule, NbSidebarModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { ReportFormModule } from './report-form/report-form.module';
import { RepairTypesDialogComponent } from './repair-types-dialog/repair-types-dialog.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
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
