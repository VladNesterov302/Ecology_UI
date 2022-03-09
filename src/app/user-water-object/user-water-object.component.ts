import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WaterObject } from '../admin-water-object/Models/waterObject.model';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-user-water-object',
  templateUrl: './user-water-object.component.html',
  styleUrls: ['./user-water-object.component.css']
})
export class UserWaterObjectComponent implements OnInit {

  public sortedData: WaterObject[] = [];
  public waterObject: WaterObject[] = [];

  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  constructor(
    private adminService: AdminService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getWaterObjects();
  }

  getWaterObjects() {
    this.adminService.getWaterObjects().toPromise().then(
      data => {
        this.waterObject = data.slice();
        this.sortedData = data.slice();
        this.setVariablesToDefault();
        this.step = this.sortedData[0].Id;
        this.length = this.sortedData.length;
        this.changePageEvent();
      });
  }

  stat(waterObject: WaterObject) {
    localStorage.setItem('waterObjectId', waterObject.Id.toString());
    localStorage.setItem('waterObject', waterObject.WaterObject);
    this.router.navigate(['/user-water-object-statistic']);
  }

  smallPrediction(waterObject: WaterObject) {
    localStorage.setItem('waterObjectId', waterObject.Id.toString());
    localStorage.setItem('waterObject', waterObject.WaterObject);
    this.router.navigate(['/user-water-object-small-prediction']);
  }

  bigPrediction(waterObject: WaterObject) {
    localStorage.setItem('waterObjectId', waterObject.Id.toString());
    localStorage.setItem('waterObject', waterObject.WaterObject);
    this.router.navigate(['/user-water-object-big-prediction']);
  }
  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.waterObject.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
    return event;
  }

  private setVariablesToDefault() {
    this.pageSize = 10;
    this.pageIndex = 0;
    this.length = 0;
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep(currentStep: number) {
    const ind = this.waterObject.findIndex(x => x.Id === currentStep);
    if (this.waterObject[ind + 1] !== undefined) {
      this.step = this.waterObject[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.waterObject.findIndex(x => x.Id === currentStep);
    if (this.waterObject[ind - 1] !== undefined) {
      this.step = this.waterObject[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.waterObject.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'WaterObject':
          return compare(a.WaterObject, b.WaterObject, isAsc);
        case 'Id':
          return compare(a.Id, b.Id, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

