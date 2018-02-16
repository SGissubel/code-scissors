import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { AuthGuard } from '../login/auth.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardHomeComponent}
  ]},
]

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule {

}