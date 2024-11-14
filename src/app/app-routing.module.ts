import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Aquí importamos los módulos de las páginas
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';

const routes: Routes = [
  // Redirigir al login si no está autenticado
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  // Rutas de lazy loading para módulos
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoModule) },

  // Nueva ruta para el historial de pedidos
  { path: 'historial-pedidos', component: HistorialPedidosComponent },

  // Ruta para el manejo de errores
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
