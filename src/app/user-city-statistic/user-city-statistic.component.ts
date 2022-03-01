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
import { LevelRadiationStatistic, LevelStatistic } from '../user-statistic/Models/statistic.model';
import { CityStatisticService } from './Services/cityStatistic.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-user-city-statistic',
  templateUrl: './user-city-statistic.component.html',
  styleUrls: ['./user-city-statistic.component.css']
})
export class UserCityStatisticComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptionsAzot: Partial<ChartOptions>;
  public chartOptionsOzon: Partial<ChartOptions>;
  public chartOptionsPm: Partial<ChartOptions>;
  public chartOptionsPm10: Partial<ChartOptions>;
  public chartOptionsSera: Partial<ChartOptions>;
  public chartOptionsBioOxygen: Partial<ChartOptions>;
  public chartOptionsChemicalOxygen: Partial<ChartOptions>;
  public chartOptionsPh: Partial<ChartOptions>;

  public levelRadiationStatistic: LevelRadiationStatistic[] = [];
  public levelAzotStatistic: LevelStatistic[] = [];
  public levelOzonStatistic: LevelStatistic[] = [];
  public levelPmStatistic: LevelStatistic[] = [];
  public levelPm10Statistic: LevelStatistic[] = [];
  public levelSeraStatistic: LevelStatistic[] = [];

  public id = Number(localStorage.getItem('cityId'));
  public city = localStorage.getItem('city');

  constructor(
    private statisticService: CityStatisticService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.chartOptions = {};
    this.chartOptionsAzot = {};
    this.chartOptionsOzon = {};
    this.chartOptionsPm = {};
    this.chartOptionsPm10 = {};
    this.chartOptionsSera = {};
  }

  ngOnInit() {
    this.getLevelRadiationStatistic();
    this.getLevelAzotStatistic();
    this.getLevelOzonStatistic();
    this.getLevelPmStatistic();
    this.getLevelPm10Statistic();
    this.getLevelSeraStatistic();
  }

  getLevelRadiationStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelRadiationStatistic(this.id).toPromise().then(
      data => {
        this.levelRadiationStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level + " уровень")
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

  getLevelAzotStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelAzotStatistic(this.id).toPromise().then(
      data => {
        this.levelAzotStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsAzot = {
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

  getLevelOzonStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelOzonStatistic(this.id).toPromise().then(
      data => {
        this.levelOzonStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsOzon = {
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

  getLevelPmStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelPmStatistic(this.id).toPromise().then(
      data => {
        this.levelPmStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsPm = {
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

  getLevelPm10Statistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelPm10Statistic(this.id).toPromise().then(
      data => {
        this.levelPm10Statistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsPm10 = {
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

  getLevelSeraStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelSeraStatistic(this.id).toPromise().then(
      data => {
        this.levelSeraStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsSera = {
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
