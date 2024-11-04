import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' }, // Redirige a /auth/login
  { path: 'auth', loadChildren: () => import('./pages/auth/auth.module').then(m => m.AuthModule) },
  { path: 'home', loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule) },
  { path: 'catalogo', loadChildren: () => import('./pages/catalogo/catalogo.module').then(m => m.CatalogoModule) },
  { path: 'carrito', loadChildren: () => import('./pages/carrito/carrito.module').then(m => m.CarritoModule) },
  { path: 'envios', loadChildren: () => import('./pages/envios/envios.module').then(m => m.EnviosModule) },
  { path: 'perfil', loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule) },
  { path: '**', redirectTo: '/auth/login' }, // Redirige a /auth/login para rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
