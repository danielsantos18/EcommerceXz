import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Home',
  },
  {
    displayName: 'Dashboard',
    iconName: 'layout-dashboard',
    route: '/dashboard',
  },
  {
    navCap: 'Ui Components',
  },
  {
    displayName: 'Notificaciones',
    iconName: 'rosette',
    route: '/ui-components/badge',
  },
  {
    displayName: 'Gestion de Productos',
    iconName: 'poker-chip',
    route: '/ui-components/chips',
  },
  {
    displayName: 'Lists',
    iconName: 'list',
    route: '/ui-components/lists',
  },
  {
    displayName: 'Finanzas',
    iconName: 'layout-navbar-expand',
    route: '/ui-components/menu',
  },
  {
    displayName: 'Clientes',
    iconName: 'tooltip',
    route: '/ui-components/cliente',
  },
  {
    displayName: 'Inventarios',
    iconName: 'assets/images/logos/inventario.png', 
    route: '/ui-components/inventarios',
  },
  {
    displayName: 'Pedidos',
    iconName: 'shopping-cart',
    route: '/ui-components/pedidos',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Login',
    iconName: 'lock',
    route: '/authentication/login',
  },
  {
    displayName: 'Logout',
    iconName: 'user-plus',
    route: '/authentication/register',
  },
  
];
