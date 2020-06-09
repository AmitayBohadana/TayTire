import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page/report-page.component';
import { AllReportsRoutingModule } from './all-reports-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbListModule, NbAccordionModule, NbButtonModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { AllReportsComponent } from './all-reports.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [ReportPageComponent,AllReportsComponent],
  imports: [
    CommonModule,
    AllReportsRoutingModule,
    NbCardModule,
    // NbTreeGridModule,
    NbAccordionModule,
    NbListModule,
    NbIconModule,
    NbInputModule,
    ThemeModule,
    // Ng2SmartTableModule,
    NbButtonModule,
    ReactiveFormsModule
  ],

})
export class AllReportsModule { }
