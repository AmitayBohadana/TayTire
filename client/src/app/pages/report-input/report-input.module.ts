import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportInputComponent } from './report-input.component';
import { RouterModule,Route } from '@angular/router';
import { FirstPageComponent } from './first-page/first-page.component';
import { NbButtonModule, NbCardModule, NbInputModule, NbSpinnerModule } from '@nebular/theme';
import { ReactiveFormsModule } from '@angular/forms';
import { ThemeModule } from '../../@theme/theme.module';
import { ReportsRoutingModule } from '../report-form/reports-routing.module';
import { SecondPageComponent } from './second-page/second-page.component';
const routes: Route[] = [

  {path:'',redirectTo:'report-input',pathMatch:'full'},
  {path:'report-input',component:ReportInputComponent,
  children:[
    {path:'',redirectTo:'first-page',pathMatch:'full'},
    {path:'first-page',component:FirstPageComponent},
    {path:'second-page',component:SecondPageComponent},
  ]}
];
@NgModule({
  declarations: [ReportInputComponent, FirstPageComponent, SecondPageComponent],
  imports: [
    RouterModule.forChild(routes),
    ReportsRoutingModule,
    ThemeModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    ReactiveFormsModule,
    NbSpinnerModule,
  ]
})
export class ReportInputModule { }
