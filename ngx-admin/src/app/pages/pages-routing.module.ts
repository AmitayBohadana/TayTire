import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';



const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [


    {
      path: 'report-form',
      loadChildren: () => import('./report-form/report-form.module')
        .then(m => m.ReportFormModule),
    },
    {
      path: 'all-reports',
      loadChildren: () => import('./all-reports/all-reports.module')
        .then(m => m.AllReportsModule),
    },
    {
      path: '',
      redirectTo: 'report-form',
      pathMatch: 'full',
    },
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
