import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

const dashboardRoutes: Routes = [
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: '', component: DashboardHomeComponent}
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule {

}