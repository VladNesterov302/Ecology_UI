import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BigPredictionService } from './Services/bigPrediction.service';

@Component({
  selector: 'app-user-city-big-prediction',
  templateUrl: './user-city-big-prediction.component.html',
  styleUrls: ['./user-city-big-prediction.component.css']
})
export class UserCityBigPredictionComponent implements OnInit {


  public id = Number(localStorage.getItem('cityId'));
  public city = localStorage.getItem('city');

  public predictionRadiation: number;
  public predictionAzot: number;
  public predictionOzon: number;
  public predictionPm: number;
  public predictionPm10: number;
  public predictionSera: number;

  constructor(private bigPredictionService: BigPredictionService,
    private router: Router,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.bigPredictionRadiation();
    this.bigPredictionAzot();
    this.bigPredictionOzon();
    this.bigPredictionPm();
    this.bigPredictionPm10();
    this.bigPredictionSera();
  }

  bigPredictionRadiation() {
    this.bigPredictionService.BigPredictionRadiation(this.id).toPromise().then(
      data => {
        this.predictionRadiation = data;
      });
  }
  bigPredictionAzot() {
    this.bigPredictionService.BigPredictionAzot(this.id).toPromise().then(
      data => {
        this.predictionAzot = data;
      });
  }
  bigPredictionOzon() {
    this.bigPredictionService.BigPredictionOzon(this.id).toPromise().then(
      data => {
        this.predictionOzon = data;
      });
  }
  bigPredictionPm() {
    this.bigPredictionService.BigPredictionPm(this.id).toPromise().then(
      data => {
        this.predictionPm = data;
      });
  }
  bigPredictionPm10() {
    this.bigPredictionService.BigPredictionPm10(this.id).toPromise().then(
      data => {
        this.predictionPm10 = data;
      });
  }
  bigPredictionSera() {
    this.bigPredictionService.BigPredictionSera(this.id).toPromise().then(
      data => {
        this.predictionSera = data;
      });
  }
}
