import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component'; 
import { MaterialModule } from '../../shared/material/material.module';

@NgModule({
  declarations: [
    HomeComponent // Mantén HomeComponent aquí
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule
  ],
  exports: [
    HomeComponent,

  ]
})
export class HomeModule { }
