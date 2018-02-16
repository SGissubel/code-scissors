import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserDetailComponent } from './dashboard-user-detail/dashboard-user-detail.component';
import { SnippetsListComponent } from './user-snippets/snippets-list/snippets-list.component';
import { SnippetEditComponent } from './user-snippets/snippet-edit/snippet-edit.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SnippetTableComponent } from './dashboard-home/snippet-table/snippet-table.component';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardUserDetailComponent,
    SnippetsListComponent,
    SnippetEditComponent,
    SnippetTableComponent
  ],

})
export class DashboardModule {

}