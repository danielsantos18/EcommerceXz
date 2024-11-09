import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Definimos las rutas principales y habilitamos el Lazy Loading
const routes: Routes = [
  // Redirigir al login si no está autenticado
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },

  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoModule) },
  { path: '**', redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
