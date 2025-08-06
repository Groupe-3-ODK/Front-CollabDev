import { Component } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-statistics',
  imports: [ChartModule],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.css',
})
export class StatisticsComponent {
  chartData: any;
  chartOptions: any;
  data: any;
  options: any;

  constructor() {
    this.chartData = {
      labels: ['Développement', 'Design', 'Testing', 'Déploiement'],
      datasets: [
        {
          data: [120, 90, 70, 50],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#66BB6A'],
          label: 'Compétences',
        },
      ],
    };

    this.chartOptions = {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Répartition des compétences',
        },
      },
    };

    this.data = {
      labels: ['Développement', 'Design', 'Marketing'],
      datasets: [
        {
          data: [40, 25, 35],
          backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
          hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D'],
        },
      ],
    };

    this.options = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            color: '#333',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    };
  }
}
