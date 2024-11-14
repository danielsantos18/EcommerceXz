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
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatTableModule } from '@angular/material/table';           // Para la tabla
import { MatPaginatorModule } from '@angular/material/paginator';  // Para la paginación
import { MatSortModule } from '@angular/material/sort';            // Para la ordenación
import { MatDatepickerModule } from '@angular/material/datepicker'; // Para el selector de fecha
import { MatNativeDateModule } from '@angular/material/core';      // Para fechas nativas

@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatSliderModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,           // Agregar módulo para la tabla
    MatPaginatorModule,       // Agregar módulo para la paginación
    MatSortModule,            // Agregar módulo para la ordenación
    MatDatepickerModule,      // Agregar módulo para el selector de fechas
    MatNativeDateModule,      // Agregar módulo para fechas nativas
  ],
  exports: [
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatOptionModule,
    MatListModule,
    MatSliderModule,
    MatDialogModule,
    MatMenuModule,
    MatTableModule,           // Exportar módulo de la tabla
    MatPaginatorModule,       // Exportar módulo de la paginación
    MatSortModule,            // Exportar módulo para la ordenación
    MatDatepickerModule,      // Exportar módulo para el selector de fechas
    MatNativeDateModule,      // Exportar módulo para fechas nativas
    
  ]
})
export class MaterialModule { }
