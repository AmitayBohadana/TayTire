import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { ReportInputComponent } from './report-form/report-input/report-input.component';


const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'report-form',
      loadChildren: () => import('./report-form/report-form.module')
        .then(m => m.ReportFormModule),
    },
    {path:'report-m',
    loadChildren:()=>import('./report-input/report-input.module')
    .then(m=>m.ReportInputModule)}
    ,
    {
      path: 'all-reports',loadChildren: () => import('./all-reports/all-reports.module').then(m => m.AllReportsModule),
    },
    {
      path: 'ngx-report-input',
      component:ReportInputComponent

    },
    {
      path: '',
      redirectTo: 'report-form',
      pathMatch: 'full',
    }
    // {
    //    path: '**',
    //    component: NotFoundComponent,
    // },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}
