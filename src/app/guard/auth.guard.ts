import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {

    // Verificamos si el usuario está autenticado
    if (this.authService.isAuthenticated()) {
      return true; // El usuario está autenticado, dejamos que pase a la ruta
    } else {
      // Si no está autenticado, redirigimos al login
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });

      // Puedes usar un servicio de notificaciones para mostrar un mensaje de error, o con `alert()`
      alert('Por favor inicie sesión para acceder a esta página.');

      return false;
    }
  }
}
