import { Component } from '@angular/core';
import { ProductService } from '../../core/product.service';
import { AuthService } from '../../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  showProfileDropdown: boolean = false;

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  // Mostrar/ocultar el dropdown de perfil
  toggleProfileDropdown(show: boolean): void {
    this.showProfileDropdown = show;
  }

  // Redirigir a la página de perfil
  goToProfile(): void {
    this.router.navigate(['/perfil']);
  }

  // Redirigir a la página de login
  goToLogin(): void {
    this.authService.logout(); // Asegúrate de que tu servicio de autenticación maneje la lógica de cierre de sesión
    this.router.navigate(['/login']);
  }

  // Redirigir a la página de login
  goToOrder(): void {
    this.router.navigate(['/historial-pedidos']);
  }

  // Cerrar sesión
  logout(): void {
    this.authService.logout(); // Asegúrate de que tu servicio de autenticación maneje la lógica de cierre de sesión
    this.router.navigate(['/login']);
  }
}
