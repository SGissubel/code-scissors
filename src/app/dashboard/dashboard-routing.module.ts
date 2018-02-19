import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserDetailComponent } from './dashboard-user-detail/dashboard-user-detail.component';
import { UserSnippetComponent } from './user-snippets/user-snippet.component';
import { SnippetEditComponent } from './user-snippets/snippet-edit/snippet-edit.component';
import { AuthGuard } from '../login/auth.guard';

const dashboardRoutes: Routes = [
  {
    path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard], children: [
    { path: '', component: DashboardHomeComponent },
    { path: 'user/detail', component: DashboardUserDetailComponent },
    { path: 'edit', component: UserSnippetComponent },
    { path: 'new', component: UserSnippetComponent }
  ]},
];

@NgModule({
  imports: [
    RouterModule.forChild(dashboardRoutes)
  ],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class DashboardRoutingModule { }
