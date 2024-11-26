import { Component, OnInit } from '@angular/core';
// Definir la interfaz para los productos del carrito
interface CartItem {
  id: number; 
  name: string;
  description: string;
  price: number;
  quantity: number;
  stock: number;
  total: number;
  
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.scss']
})
export class CarritoComponent implements OnInit {
  // Usamos la interfaz CartItem para el tipo de cada item
  cartItems: CartItem[] = [
    { id: 1, name: 'Producto A', description: 'Descripción del Producto A', price: 100, quantity: 1, stock: 5, total: 100 },
    { id: 2, name: 'Producto B', description: 'Descripción del Producto B', price: 50, quantity: 2, stock: 10, total: 100 },
  ];

  totalPrice: number = 0;
  insufficientStockMessage: string = ''; // Mensaje para mostrar si no hay stock suficiente

  ngOnInit() {
    this.calculateTotal();
  }

  // Calcular el total de la compra
  calculateTotal() {
    this.totalPrice = this.cartItems.reduce((acc, item) => acc + item.total, 0);
  }

  // Actualizar la cantidad de un producto
  updateQuantity(item: CartItem, quantity: number): void {
    if (quantity <= item.stock && quantity >= 1) {
      item.quantity = quantity;
      item.total = item.price * item.quantity;
      this.calculateTotal();
      this.insufficientStockMessage = ''; // Limpiar mensaje de error
    } else {
      this.insufficientStockMessage = '¡No hay suficiente stock disponible!';
    }
  }

  // Verificar si la cantidad es válida
  checkStock(item: CartItem): void {
    if (item.quantity > item.stock) {
      this.insufficientStockMessage = '¡No hay suficiente stock disponible!';
    } else {
      this.insufficientStockMessage = ''; // Limpiar mensaje de error
      this.updateTotal(item);
    }
  }

  // Actualizar el total del producto
  updateTotal(item: CartItem): void {
    item.total = item.price * item.quantity;
    this.calculateTotal();
  }

  // Eliminar un producto del carrito
  removeItem(item: CartItem): void {
    const index = this.cartItems.indexOf(item);
    if (index > -1) {
      if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        this.cartItems.splice(index, 1);
        this.calculateTotal();
      }
    }
  }

  // Finalizar la compra
  finalizePurchase(): void {
    alert('Redirigiendo al proceso de pago...');
    
  }
}
