// src/app/material/material.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule
    
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule
  ]
})
export class MaterialModule { }
