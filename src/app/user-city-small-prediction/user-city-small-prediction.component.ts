import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SmallPredictionService } from './Services/smallPrediction.service';


@Component({
  selector: 'app-user-city-small-prediction',
  templateUrl: './user-city-small-prediction.component.html',
  styleUrls: ['./user-city-small-prediction.component.css']
})
export class UserCitySmallPredictionComponent implements OnInit {

  public id = Number(localStorage.getItem('cityId'));
  public city = localStorage.getItem('city');

  public predictionRadiation: number;
  public predictionAzot: number;
  public predictionOzon: number;
  public predictionPm: number;
  public predictionPm10: number;
  public predictionSera: number;

  constructor(private smallPredictionService: SmallPredictionService,
    private router: Router,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.smallPredictionRadiation();
    this.smallPredictionAzot();
    this.smallPredictionOzon();
    this.smallPredictionPm();
    this.smallPredictionPm10();
    this.smallPredictionSera();
  }

  smallPredictionRadiation() {
    this.smallPredictionService.SmallPredictionRadiation(this.id).toPromise().then(
      data => {
        this.predictionRadiation = data;
      });
  }
  smallPredictionAzot() {
    this.smallPredictionService.SmallPredictionAzot(this.id).toPromise().then(
      data => {
        this.predictionAzot = data;
      });
  }
  smallPredictionOzon() {
    this.smallPredictionService.SmallPredictionOzon(this.id).toPromise().then(
      data => {
        this.predictionOzon = data;
      });
  }
  smallPredictionPm() {
    this.smallPredictionService.SmallPredictionPm(this.id).toPromise().then(
      data => {
        this.predictionPm = data;
      });
  }
  smallPredictionPm10() {
    this.smallPredictionService.SmallPredictionPm10(this.id).toPromise().then(
      data => {
        this.predictionPm10 = data;
      });
  }
  smallPredictionSera() {
    this.smallPredictionService.SmallPredictionSera(this.id).toPromise().then(
      data => {
        this.predictionSera = data;
      });
  }

}
