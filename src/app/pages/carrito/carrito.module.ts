import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';  
import { CarritoRoutingModule } from './carrito-routing.module';
import { SharedModule } from '../../shared/shared.module';  

import { CarritoComponent } from './carrito.component';

@NgModule({
  declarations: [CarritoComponent],
  imports: [
    CommonModule,
    FormsModule,  
    CarritoRoutingModule,
    SharedModule,  
  ],
  exports: [CarritoComponent]
})
export class CarritoModule { }
