import { Component, OnInit } from '@angular/core';

interface Pedido {
  id: number;
  fecha: string;
  estado: string;
  costo: number;
}

@Component({
  selector: 'app-historial-pedidos',
  templateUrl: './historial-pedidos.component.html',
  styleUrls: ['./historial-pedidos.component.scss']
})
export class HistorialPedidosComponent implements OnInit {
  // Lista de pedidos de ejemplo
  pedidos: Pedido[] = [
    { id: 123, fecha: '2024-10-01', estado: 'Pendiente', costo: 100 },
    { id: 124, fecha: '2024-10-02', estado: 'Entregado', costo: 200 },
    { id: 125, fecha: '2024-10-05', estado: 'En Proceso', costo: 150 },
    { id: 126, fecha: '2024-10-07', estado: 'Pendiente', costo: 250 },
  ];

  // Filtros y búsqueda
  filteredPedidos: Pedido[] = [...this.pedidos];
  searchText: string = '';
  estadoFiltro: string = '';
  fechaInicio: Date | null = null;
  fechaFin: Date | null = null;

  // Columnas de la tabla
  displayedColumns: string[] = ['id', 'fecha', 'estado', 'costo', 'acciones'];

  constructor() {}

  ngOnInit(): void {}

  // Función de búsqueda y filtrado
  filtrarPedidos() {
    this.filteredPedidos = this.pedidos.filter((pedido) => {
      const matchesSearchText = pedido.id.toString().includes(this.searchText);
      const matchesEstado = this.estadoFiltro ? pedido.estado === this.estadoFiltro : true;
      const matchesFecha =
        (!this.fechaInicio || new Date(pedido.fecha) >= this.fechaInicio) &&
        (!this.fechaFin || new Date(pedido.fecha) <= this.fechaFin);

      return matchesSearchText && matchesEstado && matchesFecha;
    });
  }

  // Manejar el cambio de filtro de estado
  onEstadoChange(estado: string) {
    this.estadoFiltro = estado;
    this.filtrarPedidos();
  }

  // Manejar el cambio de fechas
  onFechaChange() {
    this.filtrarPedidos();
  }

  // Función que maneja la acción de "Ver Detalles" de un pedido
  verDetalles(pedido: Pedido) {
    // Aquí podrías agregar la lógica que desees, por ejemplo, abrir un modal
    // o redirigir a una página de detalles del pedido.
    console.log('Ver detalles del pedido:', pedido);
  }
}
