import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';

import {
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatDatepickerModule,
  MatCheckboxModule,
  MatNativeDateModule,
  MatTableModule,
  MatSelectModule,
  MatSnackBarModule
} from '@angular/material';

@NgModule({
  imports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    CdkTableModule
  ],
  exports: [
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCheckboxModule,
    MatNativeDateModule,
    MatTableModule,
    MatSelectModule,
    MatSnackBarModule,
    CdkTableModule
  ],
})
export class MaterialModule { }
