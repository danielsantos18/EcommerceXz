import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/v1/users'; // URL de la API de Laravel

  constructor(private http: HttpClient) { }

  // Manejo genérico de errores en el método mismo
  private handleRequest<T>(request: Observable<T>): Observable<T> {
    return request.pipe(
      catchError((error: HttpErrorResponse) => {
        // Centralización de errores
        console.error('Error en la solicitud:', error);
        return throwError(() => error);
      })
    );
  }

  // Crear usuario
  createUser(user: User): Observable<any> {
    const request = this.http.post(`${this.apiUrl}`, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
    return this.handleRequest(request);
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    const request = this.http.get<User[]>(this.apiUrl);
    return this.handleRequest(request);
  }

  // Obtener un usuario por ID
  getUserById(id: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const request = this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
    return this.handleRequest(request);
  }

  // Actualizar un usuario
  updateUser(id: string | null, token: string | null, user: User): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const request = this.http.put<User>(`${this.apiUrl}/profile/edit`, user, { headers });
    return this.handleRequest(request);
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<any> {
    const request = this.http.delete(`${this.apiUrl}/${id}`);
    return this.handleRequest(request);
  }
}
