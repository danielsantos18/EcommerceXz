import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';  // Importar CommonModule

@Component({
  selector: 'app-inventario',
  standalone: true,
  imports: [CommonModule],  // Incluir CommonModule aquí
  templateUrl: './inventarios.component.html',
  styleUrls: ['./inventarios.component.scss']
})
export class InventarioComponent {
  
  totalProductos: number = 500;
  productosDisponibles: number = 350;
  productosAgotados: number = 50;
  valorTotalInventario: number = 120000;

  productosMasVendidos = [
    { nombre: 'Sueter Oversay', unidadesVendidas: 120 },
    { nombre: 'Zapatos', unidadesVendidas: 200 },
    { nombre: 'Accesorios', unidadesVendidas: 95 }
  ];

  productosBajoReposicion = [
    { nombre: 'Zpatos clasicos', cantidadActual: 10, cantidadRecomendada: 50 },
    { nombre: 'Jeans Urbanos', cantidadActual: 5, cantidadRecomendada: 20 },
    { nombre: 'Aretes clasicos', cantidadActual: 3, cantidadRecomendada: 30 }
  ];

  agregarProducto() {
    // Lógica para agregar un producto al inventario
    console.log('Agregar un nuevo producto');
  }

  ajustarInventario() {
    // Lógica para ajustar el inventario (por ejemplo, cambiar cantidades)
    console.log('Ajustar inventario');
  }
}
