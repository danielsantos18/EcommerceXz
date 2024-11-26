import { Component } from '@angular/core';
import { ApexNonAxisChartSeries, ApexChart, ApexXAxis, ApexDataLabels } from 'ng-apexcharts';


@Component({
  selector: 'app-menu',
  templateUrl: './finanzas.component.html'
})
export class AppFinanzasComponent {

  constructor() { }
  // Gráfico de Ingresos (Barras)
  public incomeChart: ApexChart = {
    height: 350,
    type: 'bar'
  };

  public incomeXaxis: ApexXAxis = {
    categories: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
  };

  public incomeSeries: any = [
    {
      name: "Ingresos",
      data: [5000, 6000, 7000, 8000, 7500]
    }
  ];

  // Gráfico de Gastos (Torta)
  public expenseChart: ApexChart = {
    height: 350,
    type: 'pie'
  };

  public expenseLabels: string[] = ['Alquiler', 'Salarios', 'Marketing', 'Otros'];
  public expenseSeries: ApexNonAxisChartSeries = [3000, 4000, 1500, 1000];

  // Corregir la propiedad dataLabels:
  public incomeDataLabels = {
    enabled: true, // Activar dataLabels
    style: {
      colors: ['#000'] // Color del texto de los labels (opcional)
    }
  };
  
}
