import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { User } from '../models/user.interface';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/v1'; // URL de tu API de Laravel

  constructor(private http: HttpClient) { }

  // Registro de usuario
  register(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores aquí si es necesario
        return throwError(() => error);
      })
    );
  }

  // Login de usuario
  login(user: User): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email: user.email,
      password: user.password,
    }).pipe(
      tap((response: any) => {
        const token = response?.data?.token;  // Verifica que el token esté en la respuesta
        if (token) {
          console.log('Token recibido:', token);  // Verifica que el token está presente
          this.setToken(token);  // Guarda el token en el localStorage
        } else {
          console.error('No se encontró el token en la respuesta');
        }
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejo de errores aquí si es necesario
        return throwError(() => error);
      })
    );
  }

  // Almacenar el token en el localStorage (o sessionStorage si es necesario)
  setToken(token: string): void {
    if (token) {
      localStorage.setItem('auth_token', token); // O usar sessionStorage si solo se quiere en la sesión
      console.log('Token guardado correctamente');
    } else {
      console.error('No se puede almacenar un token vacío');
    }
  }

  // Obtener el token almacenado
  getToken(): string | null {
    const token = localStorage.getItem('auth_token'); // O usar sessionStorage si es necesario
    if (!token) {
      console.error('Token no encontrado en el almacenamiento');
    }
    return token;
  }

  // Obtener el ID de usuario del token decodificado
  getUserIdFromToken(): string | null {
    const token = this.getToken();

    if (!token) {
      console.error('No se encontró el token');
      return null;
    }

    try {
      const decodedToken: any = jwtDecode(token);
      console.log('Token decodificado:', decodedToken);
      console.log('Token decodificado:', decodedToken.sub);
      // Verifica si el token tiene un id válido
      return decodedToken?.sub ?? null;
    } catch (error) {
      console.error('Error al decodificar el token:', error);
      return null; // Si no se puede decodificar, retornamos null
    }
  }

  // Eliminar el token (cerrar sesión)
  logout(): void {
    localStorage.removeItem('auth_token');
    console.log('Token eliminado del localStorage');
  }

  // Verificar si el usuario está autenticado (tiene token)
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
}
