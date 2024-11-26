import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html'
})
export class AppBadgeComponent implements OnInit {

  // Variables para manejar las notificaciones
  pendingOrders: number = 12;          // Pedidos pendientes
  newReviews: number = 5;              // Nuevas reseñas de productos
  lowStockProducts: number = 3;        // Productos con bajo stock
  newUsers: number = 25;               // Nuevos usuarios registrados

  // Variable para ocultar o mostrar los badges
  hidden: boolean = false;             // Controla la visibilidad de los badges

  constructor() { }

  ngOnInit(): void {
    // Simulación de datos dinámicos
    setInterval(() => {
      this.simulateNewNotifications();
    }, 5000); // Simula nuevas notificaciones cada 5 segundos
  }

  // Método para simular nuevas notificaciones
  simulateNewNotifications() {
    // Simula la llegada de nuevos pedidos, reseñas, usuarios y productos con bajo stock
    this.pendingOrders = this.getRandomNumber(5, 15); // Genera un número aleatorio entre 5 y 15
    this.newReviews = this.getRandomNumber(1, 10);    // Genera un número aleatorio entre 1 y 10
    this.lowStockProducts = this.getRandomNumber(0, 5); // Genera un número aleatorio entre 0 y 5
    this.newUsers = this.getRandomNumber(10, 30);     // Genera un número aleatorio entre 10 y 30
  }

  // Método para generar un número aleatorio entre un rango
  getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  /**
   * Método para ver los pedidos pendientes
   */
  viewPendingOrders(): void {
    console.log('Ver pedidos pendientes...');
    // Aquí podrías redirigir al usuario a una página de pedidos
    // Por ejemplo: this.router.navigate(['/pedidos']);
  }

  /**
   * Método para ver las nuevas reseñas
   */
  viewReviews(): void {
    console.log('Ver nuevas reseñas...');
    // Lógica para navegar a la página de reseñas o cargar los datos
  }

  /**
   * Método para ver los productos con bajo stock
   */
  viewLowStockProducts(): void {
    console.log('Ver productos con bajo stock...');
    // Lógica para redirigir a la página de productos con bajo inventario
  }

  /**
   * Método para ver los nuevos usuarios registrados
   */
  viewNewUsers(): void {
    console.log('Ver nuevos usuarios registrados...');
    // Lógica para navegar a la página de usuarios
  }

  /**
   * Método para alternar la visibilidad de las notificaciones de ventas
   */
  toggleBadgeVisibility(): void {
    this.hidden = !this.hidden;
    console.log(this.hidden ? 'Notificaciones ocultadas' : 'Notificaciones mostradas');
  }
}
