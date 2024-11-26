import { Component, Inject, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from '../../../models/product.interface';
import { Inventory } from '../../../models/inventory.interface';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements AfterViewInit {
  product: Product;
  categories: string[] = [];
  inventories: Inventory[] = [];
  currentIndex: number = 0; // Índice de la imagen actual
  isSpecificationVisible = false;

  constructor(
    public dialogRef: MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    // Inicializa el producto y las categorías desde los datos inyectados
    this.product = data.product;
    this.categories = data.product.categories;
    this.inventories = data.product.inventories;
  }

  // Método para alternar la visibilidad
  toggleSpecification() {
    this.isSpecificationVisible = !this.isSpecificationVisible;
  }

  // Función para procesar el inventario y asignar el estado
  setInventoryStatus(): void {
    if (this.product) {
      // Recorremos cada inventario y asignamos el estado basado en la cantidad
      this.inventories.forEach((inventory) => {
        if (inventory.quantity > 15) {
          inventory.status = 'Disponible';
        } else if (inventory.quantity > 0) {
          inventory.status = 'Pocas unidades';
        } else {
          inventory.status = 'No disponible';
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.setInventoryStatus();
  }

  // Método para obtener la URL de las imágenes (asumiendo que el backend retorna la URL correcta)
  getImageUrl(image: string): string {
    return 'http://localhost:8000' + image; // Asegúrate de que 'image' sea una ruta válida
  }

  // Función para mover el slider (hacia adelante o hacia atrás)
  moveSlider(direction: number): void {
    this.currentIndex += direction;

    // Aseguramos que el índice esté dentro del rango de las imágenes
    if (this.currentIndex < 0) {
      this.currentIndex = this.product.images.length - 1; // Vuelve al final si es menor que 0
    }

    if (this.currentIndex >= this.product.images.length) {
      this.currentIndex = 0; // Vuelve al inicio si es mayor o igual a la longitud del array
    }
  }

  // Cambiar a una imagen específica cuando el usuario hace clic en la paginación
  goToSlide(index: number): void {
    this.currentIndex = index;
  }

  close(): void {
    this.dialogRef.close(); // Cierra el modal
  }

  addToCart(): void {
    console.log("Producto añadido al carrito:", this.data);
    this.dialogRef.close(); // Cierra el modal después de agregar al carrito
  }
}
