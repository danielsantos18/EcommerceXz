import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialPedidosComponent } from './historial-pedidos.component';

const routes: Routes = [
  { path: '', component: HistorialPedidosComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HistorialPedidosRoutingModule { }
