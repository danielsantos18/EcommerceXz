import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guard/auth.guard';
import { HistorialPedidosComponent } from './pages/historial-pedidos/historial-pedidos.component';

// Definimos las rutas principales y habilitamos el Lazy Loading
const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },

  // Ruta de perfil protegida por el Auth Guard
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule), canActivate: [AuthGuard] },

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
