import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { SmallPredictionService } from '../user-city-small-prediction/Services/smallPrediction.service';

@Component({
  selector: 'app-user-water-object-small-prediction',
  templateUrl: './user-water-object-small-prediction.component.html',
  styleUrls: ['./user-water-object-small-prediction.component.css']
})
export class UserWaterObjectSmallPredictionComponent implements OnInit {

  public id = Number(localStorage.getItem('waterObjectId'));
  public waterObject = localStorage.getItem('waterObject');

  public predictionBioOxygen: number;
  public predictionChemicalOxygen: number;
  public predictionPh: number;

  constructor(private smallPredictionService: SmallPredictionService,
    private router: Router,
    public snackBar: MatSnackBar,) { }

  ngOnInit() {
    this.smallPredictionBioOxygen();
    this.smallPredictionChemicalOxygen();
    this.smallPredictionPh();
  }

  smallPredictionBioOxygen() {
    this.smallPredictionService.SmallPredictionBioOxygen(this.id).toPromise().then(
      data => {
        this.predictionBioOxygen = data;
      });
  }
  smallPredictionChemicalOxygen() {
    this.smallPredictionService.SmallPredictionChemicalOxygen(this.id).toPromise().then(
      data => {
        this.predictionChemicalOxygen = data;
      });
  }
  smallPredictionPh() {
    this.smallPredictionService.SmallPredictionPh(this.id).toPromise().then(
      data => {
        this.predictionPh = data;
      });
  }


}
