import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { ApexLegend, ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexDataLabels
} from "ng-apexcharts";
import { LevelStatistic } from '../user-statistic/Models/statistic.model';
import { WaterObjectStatisticService } from './Services/waterObjectStatistic.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-user-water-object-statistic',
  templateUrl: './user-water-object-statistic.component.html',
  styleUrls: ['./user-water-object-statistic.component.css']
})
export class UserWaterObjectStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsChemicalOxygen: Partial<ChartOptions>;
  public chartOptionsPh: Partial<ChartOptions>;

  public levelBioOxygenStatistic: LevelStatistic[] = [];
  public levelChemicalOxygenStatistic: LevelStatistic[] = [];
  public levelPhStatistic: LevelStatistic[] = [];

  public id = Number(localStorage.getItem('waterObjectId'));
  public waterObject = localStorage.getItem('waterObject');

  constructor(
    private statisticService: WaterObjectStatisticService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.chartOptions = {};
    this.chartOptionsChemicalOxygen = {};
    this.chartOptionsPh = {};
  }

  ngOnInit() {
    this.getLevelBioOxygenStatistic();
    this.getLevelChemicalOxygenStatistic();
    this.getLevelPhStatistic();
  }

  getLevelBioOxygenStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelBioOxygenStatistic(this.id).toPromise().then(
      data => {
        this.levelBioOxygenStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptions = {
          series: number,
          chart: {
            type: "donut"
          },
          legend: {
            position: "right",
            fontSize: "20px",
            fontWeight: "bold",
          },
          labels: level,
          dataLabels: {
            style: {
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              colors: ["black"]
            }
          },
        };
      });
  }

  getLevelChemicalOxygenStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelChemicalOxygenStatistic(this.id).toPromise().then(
      data => {
        this.levelChemicalOxygenStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsChemicalOxygen = {
          series: number,
          chart: {
            type: "donut"
          },
          legend: {
            position: "right",
            fontSize: "20px",
            fontWeight: "bold",
          },
          labels: level,
          dataLabels: {
            style: {
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              colors: ["black"]
            }
          },
        };
      });
  }

  getLevelPhStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelPhStatistic(this.id).toPromise().then(
      data => {
        this.levelPhStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsPh = {
          series: number,
          chart: {
            type: "donut"
          },
          legend: {
            position: "right",
            fontSize: "20px",
            fontWeight: "bold",
          },
          labels: level,
          dataLabels: {
            style: {
              fontSize: "16px",
              fontFamily: "Helvetica, Arial, sans-serif",
              fontWeight: "400",
              colors: ["black"]
            }
          },
        };
      });
  }

}

