import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportPageComponent } from './report-page/report-page.component';
import { AllReportsRoutingModule } from './all-reports-routing.module';
import { NbCardModule, NbIconModule, NbInputModule, NbListModule, NbAccordionModule } from '@nebular/theme';
import { ThemeModule } from '../../@theme/theme.module';
import { Ng2SmartTableModule } from 'ng2-smart-table';

@NgModule({
  declarations: [ReportPageComponent],
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
    Ng2SmartTableModule,
  ]
})
export class AllReportsModule { }
