import { NgModule } from '@angular/core';
import { NbLayoutModule, NbMenuModule, NbSidebarModule, NbSpinnerComponent } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { BaseComponent } from './base/base.component';
import { RepairTypesDialogComponent } from './repair-types-dialog/repair-types-dialog.component';
import { RepairChoiseModalComponent } from './modal-overlays/repair-choise-modal/repair-choise-modal.component';
import { ReportFormModule } from './report-form/report-form.module';

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
  entryComponents:[]
})
export class PagesModule {
}
