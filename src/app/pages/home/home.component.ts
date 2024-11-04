import { Component } from '@angular/core';

interface Product {
  id?: number;
  name?: string;
  price?: number;
  image?: string;
  description?: string;
  available?: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  products: Product[] = [
    { id: 1, name: 'Producto 1', price: 29.99, image: 'assets/product1.jpg', description: 'Descripción del Producto 1', available: true },
    { id: 2, name: 'Producto 2', price: 19.99, image: 'assets/product1.jpg', description: 'Descripción del Producto 2', available: false },
    // Añade más productos según sea necesario
  ];

  showProductDetail = false;
  selectedProduct: Product | null = null;

  searchProducts(event: Event): void {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    console.log("Buscando productos con el término:", query);
    // Implementa el filtrado de productos aquí
  }

  openFilters(): void {
    console.log("Mostrando opciones de filtro");
    // Lógica para abrir el filtro de productos
  }

  viewProductDetail(product: Product): void {
    this.selectedProduct = product;
    this.showProductDetail = true;
  }

  closeProductDetail(): void {
    this.showProductDetail = false;
    this.selectedProduct = null;
  }

  addToCart(product: Product): void {
    console.log("Producto agregado al carrito:", product);
    // Aquí puedes implementar una notificación o lógica adicional
  }
}
