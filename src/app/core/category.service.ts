import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {


  private apiUrl = 'http://localhost:8000/api/v1/categories'; // URL de tu API de Laravel

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getAllCategories(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un producto por su ID
  getCategoryById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
