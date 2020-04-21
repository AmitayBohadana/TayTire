import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportInputComponent } from './report-input/report-input.component';
import { ThemeModule } from '../../@theme/theme.module';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbCheckboxModule,
  NbDatepickerModule, NbIconModule,
  NbInputModule,
  NbRadioModule,
  NbSelectModule,
  NbUserModule,
  NbStepperModule,
  NbListModule,
  NbSpinnerModule
} from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { UdpCurrencyMaskPipe } from '../../@theme/pipes/UdpCurrencyMaskPipe';
import { ReportFormComponent } from './report-form.component';



@NgModule({
  imports: [
    ReportsRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    ReactiveFormsModule,
    NbStepperModule,
    NbListModule,
    NbSpinnerModule
  ],
  declarations: [
    ReportInputComponent,
    ReportFormComponent

  ],

  providers:[UdpCurrencyMaskPipe],
  entryComponents:[]
})
export class ReportFormModule { }
