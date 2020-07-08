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
  NbSpinnerModule,
  NbAutocompleteModule
} from '@nebular/theme';

import { ReactiveFormsModule } from '@angular/forms';
import { ReportsRoutingModule } from './reports-routing.module';
import { UdpCurrencyMaskPipe } from '../../@theme/pipes/UdpCurrencyMaskPipe';
import { ReportFormComponent } from './report-form.component';
import { ToNumberPipe } from '../../@theme/pipes/toNumber.pipe';
import { NumberWithCommasPipe } from '../../@theme/pipes';
import { RepairChoiseModalComponent } from '../modal-overlays/repair-choise-modal/repair-choise-modal.component';
import { ModalOverlaysModule } from '../modal-overlays/modal-overlays.module';
import { TireFormComponent } from './tire-form/tire-form.component';
import { TiresStepperComponent } from './tires-stepper/tires-stepper.component';



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
    NbSpinnerModule,
    ModalOverlaysModule,
    NbAutocompleteModule
  ],
  declarations: [
    ReportInputComponent,
    ReportFormComponent,
    TireFormComponent,
    TiresStepperComponent,

  ],

  providers:[UdpCurrencyMaskPipe,NumberWithCommasPipe,ToNumberPipe],
  entryComponents:[]
})
export class ReportFormModule { }
