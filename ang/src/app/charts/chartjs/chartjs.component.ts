// chartjs.component.ts
import { Component, Input } from '@angular/core';
import * as chartsData from '../../shared/data/chartjs';

@Component({
  selector: 'app-chartjs',
  templateUrl: './chartjs.component.html',
  styleUrls: ['./chartjs.component.scss']
})
export class ChartjsComponent {
  // Input properties to accept partnership and proposal counts
  @Input() partnershipCount: number = 0;
  @Input() proposalCount: number = 0;

  // lineChart
  public lineChartData = chartsData.lineChartData;
  public lineChartLabels = chartsData.lineChartLabels;
  public lineChartOptions = chartsData.lineChartOptions;
  public lineChartColors = chartsData.lineChartColors;
  public lineChartLegend = chartsData.lineChartLegend;
  public lineChartType = chartsData.lineChartType;

  // Initialize chart data with partnership and proposal counts
  ngOnChanges() {
    this.lineChartData = [
      { data: [this.partnershipCount, this.proposalCount], label: 'Partnerships vs Proposals' }
    ];
  }

  // Events
  public chartClicked(e: any): void {
    // your code here
  }

  public chartHovered(e: any): void {
    // your code here
  }
}
