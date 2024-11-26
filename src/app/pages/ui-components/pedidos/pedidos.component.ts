import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pedidos.component.html',
  styleUrls: ['./pedidos.component.scss']
})
export class PedidosComponent {
  
  // Estadísticas
  totalPedidos: number = 200;
  pedidosPendientes: number = 50;
  pedidosCompletados: number = 150;
  valorTotalPedidos: number = 50000;

  // Lista de pedidos recientes
  pedidosRecientes = [
    { id: '123', cliente: 'Juan Pérez', fecha: '2024-11-25', estado: 'Pendiente', total: 150 },
    { id: '124', cliente: 'Ana Gómez', fecha: '2024-11-24', estado: 'Enviado', total: 200 },
    { id: '125', cliente: 'Luis Martínez', fecha: '2024-11-23', estado: 'Completado', total: 100 },
  ];

  // Búsqueda
  searchQuery: string = '';

  // Método para manejar el cambio en el campo de búsqueda
  onSearchChange(event: any) {
    // Actualizamos el valor de searchQuery con el valor ingresado en el input
    this.searchQuery = event.target.value;
    console.log('Busqueda cambiada:', this.searchQuery);
    this.filtrarPedidos(); // Llamamos a filtrarPedidos() para aplicar el filtro
  }

  // Filtrar pedidos según la búsqueda
  filtrarPedidos() {
    const query = this.searchQuery.toLowerCase();
    this.pedidosRecientes = this.pedidosRecientes.filter(pedido =>
      pedido.cliente.toLowerCase().includes(query) ||
      pedido.id.includes(query)
    );
    console.log('Pedidos filtrados:', this.pedidosRecientes);
  }

  // Ver detalles del pedido
  verDetalles(id: string) {
    console.log('Ver detalles del pedido ID:', id);
  }

  // Cambiar el estado de un pedido
  cambiarEstado(id: string, nuevoEstado: string) {
    console.log(`Cambiar estado del pedido ID ${id} a ${nuevoEstado}`);
    const pedido = this.pedidosRecientes.find(p => p.id === id);
    if (pedido) {
      pedido.estado = nuevoEstado;
    }
  }

  // Agregar un nuevo pedido
  agregarPedido() {
    console.log('Agregar nuevo pedido');
  }

  // Reembolsar un pedido
  reembolsarPedido() {
    console.log('Reembolsar pedido');
  }
}
