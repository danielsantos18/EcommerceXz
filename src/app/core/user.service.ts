import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:8000/api/v1/users'; // URL de la API de Laravel

  constructor(private http: HttpClient) { }

  // Crear usuario
  createUser(user: User): Observable<any> {
    return this.http.post(this.apiUrl, user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }

  // Obtener todos los usuarios
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // Método para obtener el usuario por ID
  getUserById(id: string, token: string | null): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });  //Aquí debes pasar los headers
  }

  // Actualizar un usuario
  updateUser(id: string | null, token: string | null, user: User): Observable<any> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  // Eliminar un usuario
  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
