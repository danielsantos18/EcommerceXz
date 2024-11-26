import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = 'http://localhost:8000/api/v1/products'; // URL de tu API de Laravel

  constructor(private http: HttpClient) { }

  // Obtener todos los productos
  getAllProducts(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  // Obtener un producto por su ID
  getProductById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  // Obtener detalles de un producto específico, incluidas sus categorías
  getProductDetail(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product-detail/${id}`);
  }

  filterProductsByCategory(categoryId: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/product-category/${categoryId}`);
  }
}
