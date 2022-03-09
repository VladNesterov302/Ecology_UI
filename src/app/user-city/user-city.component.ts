import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';

@Component({
  selector: 'app-user-city',
  templateUrl: './user-city.component.html',
  styleUrls: ['./user-city.component.css']
})
export class UserCityComponent implements OnInit {
  public sortedData: City[] = [];
  public city: City[] = [];

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
    this.getCities();
  }


  getCities() {
    this.adminService.getCities().toPromise().then(
      data => {
        this.city = data.slice();
        this.sortedData = data.slice();
        this.setVariablesToDefault();
        this.step = this.sortedData[0].Id;
        this.length = this.sortedData.length;
        this.changePageEvent();
      });
  }

  stat(city: City) {
    localStorage.setItem('cityId', city.Id.toString());
    localStorage.setItem('city', city.City);
    this.router.navigate(['/user-city-statistic']);
  }

  smallPrediction(city: City) {
    localStorage.setItem('cityId', city.Id.toString());
    localStorage.setItem('city', city.City);
    this.router.navigate(['/user-city-small-prediction']);
  }

  bigPrediction(city: City) {
    localStorage.setItem('cityId', city.Id.toString());
    localStorage.setItem('city', city.City);
    this.router.navigate(['/user-city-big-prediction']);
  }

  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.city.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.city.findIndex(x => x.Id === currentStep);
    if (this.city[ind + 1] !== undefined) {
      this.step = this.city[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.city.findIndex(x => x.Id === currentStep);
    if (this.city[ind - 1] !== undefined) {
      this.step = this.city[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.city.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'City':
          return compare(a.City, b.City, isAsc);
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
