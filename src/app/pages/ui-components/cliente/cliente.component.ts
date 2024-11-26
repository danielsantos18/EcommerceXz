import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-cliente',
  standalone: true,
  imports: [CommonModule],  // Incluir CommonModule aquí
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.scss']
})
export class ClienteComponent {
  
  totalClientes: number = 1200;
  clientesActivos: number = 850;
  nuevosRegistros: number = 50;
  clientesInactivos: number = 350;

  topClientes = [
    { nombre: 'Juan Pérez', actividad: 'Compra frecuente' },
    { nombre: 'Ana Gómez', actividad: 'Comentarios regulares' },
    { nombre: 'Luis Martínez', actividad: 'Inicia sesión a diario' },
    { nombre: 'Carlos Díaz', actividad: 'Visita páginas de productos' },
    { nombre: 'Laura Sánchez', actividad: 'Realiza búsquedas frecuentes' }
  ];

  clientesInactivosList = [
    { nombre: 'Pedro Gómez', ultimaActividad: 'Hace 3 meses' },
    { nombre: 'María Rodríguez', ultimaActividad: 'Hace 2 meses' },
    { nombre: 'Sofía López', ultimaActividad: 'Hace 5 meses' },
    { nombre: 'José García', ultimaActividad: 'Hace 1 mes' },
    { nombre: 'Raúl Pérez', ultimaActividad: 'Hace 4 meses' }
  ];

  clientesFrecuentes = [{}, {}, {}, {}];  // Simulación de datos
  clientesOcasionales = [{}, {}, {}];     // Simulación de datos
  

  verDetallesCliente() {
    // Aquí iría la lógica para ver detalles del cliente
    console.log('Ver detalles de cliente');
  }

  exportarDatos() {
    // Aquí iría la lógica para exportar los datos, por ejemplo a un archivo CSV
    console.log('Exportando datos...');
  }
}
