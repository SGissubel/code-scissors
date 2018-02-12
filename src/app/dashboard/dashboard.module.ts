import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserDetailComponent } from './dashboard-user-detail/dashboard-user-detail.component';
import { SnippetsListComponent } from './user-snippets/snippets-list/snippets-list.component';
import { SnippetEditComponent } from './user-snippets/snippet-edit/snippet-edit.component';
import { DashboardRoutingModule } from './dashboard-routing.module';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardUserDetailComponent,
    SnippetsListComponent,
    SnippetEditComponent,
  ],

})
export class DashboardModule {

}