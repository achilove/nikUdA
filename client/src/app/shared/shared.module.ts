import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatSidenavModule, MatToolbarModule, MatMenuModule, MatIconModule, MatFormFieldModule, MatInputModule, MatListModule, MatGridListModule, MatOptionModule, MatAutocompleteModule, MatTooltipModule, MatButtonToggleModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const MATERIAL_MODULES = [
  CommonModule,
  MatCardModule,
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatMenuModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatListModule,
  MatGridListModule,
  MatOptionModule,
  MatAutocompleteModule,
  MatTooltipModule,
  MatButtonToggleModule
];

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    // FormsModule,
    ReactiveFormsModule,
    MATERIAL_MODULES
  ],
  exports: [MATERIAL_MODULES]
})
export class SharedModule { }
