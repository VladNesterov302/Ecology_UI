import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { BigPredictionService } from '../user-city-big-prediction/Services/bigPrediction.service';

@Component({
  selector: 'app-user-water-object-big-prediction',
  templateUrl: './user-water-object-big-prediction.component.html',
  styleUrls: ['./user-water-object-big-prediction.component.css']
})
export class UserWaterObjectBigPredictionComponent implements OnInit {0

  public id = Number(localStorage.getItem('waterObjectId'));
  public waterObject = localStorage.getItem('waterObject');

  public predictionBioOxygen: number;
  public predictionChemicalOxygen: number;
  public predictionPh: number;

  constructor(private bigPredictionService: BigPredictionService,
    private router: Router,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.bigPredictionBioOxygen();
    this.bigPredictionChemicalOxygen();
    this.bigPredictionPh();
  }

  bigPredictionBioOxygen() {
    this.bigPredictionService.BigPredictionBioOxygen(this.id).toPromise().then(
      data => {
        this.predictionBioOxygen = data;
      });
  }
  bigPredictionChemicalOxygen() {
    this.bigPredictionService.BigPredictionChemicalOxygen(this.id).toPromise().then(
      data => {
        this.predictionChemicalOxygen = data;
      });
  }
  bigPredictionPh() {
    this.bigPredictionService.BigPredictionPh(this.id).toPromise().then(
      data => {
        this.predictionPh = data;
      });
  }
  
}
