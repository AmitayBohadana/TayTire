import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportFormComponent } from './report-form.component';
import { ReportInputComponent } from './report-input/report-input.component';



const routes: Routes = [
  {
    path: '',
    component: ReportFormComponent,
    children: [
      // {
      //   path: 'ngx-report-input',
      //   loadChildren: () => import('./report-form/report-form.module')
      //     .then(m => m.ReportFormModule),
      // },
      // {
      //   path: 'all-reports',
      //   loadChildren: () => import('./all-reports/all-reports.module')
      //     .then(m => m.AllReportsModule),
      // },
      {
        path: 'ngx-report-input',
        component:ReportInputComponent

      },
      // {
      //    path: '**',
      //    component: NotFoundComponent,
      // },
    ],
  },
  {
    path: 'ngx-report-input',
    component: ReportFormComponent,
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule,
  ],
})
export class ReportsRoutingModule {
}

