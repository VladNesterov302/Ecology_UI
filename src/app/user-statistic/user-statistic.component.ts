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
import { LevelRadiationStatistic, LevelStatistic } from './Models/statistic.model';
import { StatisticService } from './Services/statistic.service';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  dataLabels: ApexDataLabels;
};

@Component({
  selector: 'app-user-statistic',
  templateUrl: './user-statistic.component.html',
  styleUrls: ['./user-statistic.component.css']
})
export class UserStatisticComponent implements OnInit {
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
  public levelBioOxygenStatistic: LevelStatistic[] = [];
  public levelChemicalOxygenStatistic: LevelStatistic[] = [];
  public levelPhStatistic: LevelStatistic[] = [];

  constructor(
    private statisticService: StatisticService,
    private router: Router,
    public snackBar: MatSnackBar,
  ) {
    this.chartOptions = {};
    this.chartOptionsAzot = {};
    this.chartOptionsOzon = {};
    this.chartOptionsPm = {};
    this.chartOptionsPm10 = {};
    this.chartOptionsSera = {};
    this.chartOptionsBioOxygen = {};
    this.chartOptionsChemicalOxygen = {};
    this.chartOptionsPh = {};
  }

  ngOnInit() {
    this.getLevelRadiationStatistic();
    this.getLevelAzotStatistic();
    this.getLevelOzonStatistic();
    this.getLevelPmStatistic();
    this.getLevelPm10Statistic();
    this.getLevelSeraStatistic();
    this.getLevelBioOxygenStatistic();
    this.getLevelChemicalOxygenStatistic();
    this.getLevelPhStatistic();
  }

  getLevelRadiationStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelRadiationStatistic().toPromise().then(
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
    this.statisticService.getLevelAzotStatistic().toPromise().then(
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
    this.statisticService.getLevelOzonStatistic().toPromise().then(
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
    this.statisticService.getLevelPmStatistic().toPromise().then(
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
    this.statisticService.getLevelPm10Statistic().toPromise().then(
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
    this.statisticService.getLevelSeraStatistic().toPromise().then(
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

  getLevelBioOxygenStatistic() {
    const number = [];
    const level = [];
    this.statisticService.getLevelBioOxygenStatistic().toPromise().then(
      data => {
        this.levelBioOxygenStatistic = data;
        for (let i = 0; i < data.length; i++) {
          number.push(data[i].Number)
          level.push(data[i].Level)
        }
        this.chartOptionsBioOxygen = {
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
    this.statisticService.getLevelChemicalOxygenStatistic().toPromise().then(
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
    this.statisticService.getLevelPhStatistic().toPromise().then(
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
