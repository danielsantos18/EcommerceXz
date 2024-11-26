import { Routes } from '@angular/router';

// ui
import { AppBadgeComponent } from './badge/badge.component';
import { AppChipsComponent } from './product/chips.component';
import { AppListsComponent } from './lists/lists.component';
import { AppFinanzasComponent } from './finanzas/finanzas.component';

// Nuevos componentes
import { ClienteComponent } from './cliente/cliente.component';
import { InventarioComponent } from './inventarios/inventarios.component';
import { PedidosComponent } from './pedidos/pedidos.component';

export const UiComponentsRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'badge',
        component: AppBadgeComponent,
      },
      {
        path: 'chips',
        component: AppChipsComponent,
      },
      {
        path: 'lists',
        component: AppListsComponent,
      },
      {
        path: 'menu',
        component: AppFinanzasComponent,
      },
      // Nuevas rutas agregadas
      {
        path: 'cliente',
        component: ClienteComponent,
      },
      {
        path: 'inventarios',
        component: InventarioComponent
      },
      {
        path: 'pedidos',
        component: PedidosComponent,
      },
    ],
  },
];
