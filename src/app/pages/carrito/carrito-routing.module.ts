import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CarritoComponent } from './carrito.component';  // Importa el CarritoComponent

// Definimos la ruta para el carrito
const routes: Routes = [
  { path: '', component: CarritoComponent }  // Ruta vacía para el módulo del carrito
];

@NgModule({
  imports: [RouterModule.forChild(routes)],  // Configuramos las rutas del CarritoModule
  exports: [RouterModule]  // Exportamos el RouterModule para que sea accesible
})
export class CarritoRoutingModule { }
