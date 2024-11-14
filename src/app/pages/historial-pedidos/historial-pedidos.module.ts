import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistorialPedidosComponent } from './historial-pedidos.component';
import { HistorialPedidosRoutingModule } from './historial-pedidos-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HistorialPedidosRoutingModule // Asegúrate de que el módulo de rutas esté importado
  ]
})
export class HistorialPedidosModule { }
