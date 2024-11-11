import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000/api/v1'; // URL de tu API de Laravel

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }

  login(user: User): Observable<any> {
    // Hacer la solicitud POST con los datos del usuario
    return this.http.post(`${this.apiUrl}/login`, {
      email: user.email,
      password: user.password
    });
  }

  // Almacenar el token JWT en el localStorage
  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  // Obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  // Eliminar el token (cerrar sesión)
  logout(): void {
    localStorage.removeItem('auth_token');
  }

  // Verificar si el usuario está autenticado (tiene token)
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}

