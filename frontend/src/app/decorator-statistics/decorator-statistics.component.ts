import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../models/User';
import { Chart, registerables } from 'chart.js';
import { Router } from '@angular/router';
import { DecoratorService } from '../services/decorator.service';

@Component({
  selector: 'app-decorator-statistics',
  templateUrl: './decorator-statistics.component.html',
  styleUrls: ['./decorator-statistics.component.css']
})
export class DecoratorStatisticsComponent {
  constructor(private decoratorService: DecoratorService, private router: Router) {}

  user: User = new User();
  @ViewChild('barChart', { static: true }) barChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('pieChart', { static: true }) pieChartRef!: ElementRef<HTMLCanvasElement>;
  @ViewChild('histogramChart', { static: true }) histogramChartRef!: ElementRef<HTMLCanvasElement>;

  ngOnInit(): void {
    Chart.register(...registerables);

    let tmp = localStorage.getItem("ulogovan");
    if(tmp) this.user = JSON.parse(tmp);

    this.barChart();
    this.pieChart();
    this.histogramChart();
  }

  barChart(): void {
    this.decoratorService.getBarData(this.user.username).subscribe((data: any) => {
      const ctx = this.barChartRef.nativeElement.getContext('2d');
      const labels = data.map((item: any) => item.month);
      const values = data.map((item: any) => item.jobCount);

      if(!ctx) return;

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Број послова по месецима',
            data: values,
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              title: {
                display: true,
                text: 'Месец'
              }
            },
            y: {
              title: {
                display: true,
                text: 'Број послова'
              },
              beginAtZero: true
            }
          }
        }
      });
    });
  }

  pieChart(): void {
    this.decoratorService.getPieData(this.user.firmName).subscribe((data: any) => {
      const ctx = this.pieChartRef.nativeElement.getContext('2d');
      const labels = data.labels;
      const values = data.data;

      if(!ctx) return;

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            label: 'Расподела послова међу декоратерима',
            data: values,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    });
  }

  histogramChart(): void {
    this.decoratorService.getHistogramData().subscribe((data: any) => {
      const ctx = this.histogramChartRef.nativeElement.getContext('2d');
      const labels = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
      const values = labels.map(label => {
          const dayData = data.find((d: any) => d.day === label);
          return dayData ? dayData.averageJobs : 0;
      });

      if (!ctx) return;

      new Chart(ctx, {
          type: 'bar',
          data: {
              labels: labels,
              datasets: [{
                  label: 'Prosecan broj poslova po danima u nedelji',
                  data: values,
                  backgroundColor: 'rgba(75, 192, 192, 0.2)',
                  borderColor: 'rgba(75, 192, 192, 1)',
                  borderWidth: 1
              }]
          },
          options: {
              responsive: true
          }
      });
    });
  }
}
