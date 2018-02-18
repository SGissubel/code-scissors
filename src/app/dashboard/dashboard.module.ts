import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { AppRoutingModule } from '../app-routing.module';
import { DashboardComponent } from './dashboard.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { DashboardUserDetailComponent } from './dashboard-user-detail/dashboard-user-detail.component';
import { UserSnippetComponent } from './user-snippets/user-snippet.component';
import { SnippetEditComponent } from './user-snippets/snippet-edit/snippet-edit.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { SnippetTableComponent } from './user-snippets/snippet-table/snippet-table.component';
import { MonacoEditorModule, NgxMonacoEditorConfig } from 'ngx-monaco-editor';
import { MaterialModule } from '../material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SnippetsService } from './services/snippets.service';
import { UserDataService } from './services/userData.service';
import { LanguagesService } from './user-snippets/snippet-edit/languages.service';

const monacoConfig: NgxMonacoEditorConfig = {
  baseUrl: 'app-name/assets',
  defaultOptions: { scrollBeyondLastLine: false }, // pass deafult options to be used
  onMonacoLoad: () => { console.log((<any>window).monaco); } // here monaco object will be avilable as window.monaco use this function to extend monaco editor functionalities.
};

@NgModule({
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    MonacoEditorModule.forRoot(monacoConfig),
    FormsModule,
    HttpClientModule,
    HttpModule
  ],
  declarations: [
    DashboardComponent,
    DashboardHomeComponent,
    DashboardUserDetailComponent,
    SnippetEditComponent,
    SnippetTableComponent,
    UserSnippetComponent,
    SnippetTableComponent
  ],
  providers: [
    LanguagesService,
    SnippetsService,
    UserDataService
  ]
})
export class DashboardModule {

}
