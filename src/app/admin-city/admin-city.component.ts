import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable } from 'rxjs';
import { AdminService } from '../shared/admin.service';
import { City } from './Models/city.model';

@Component({
  selector: 'app-admin-city',
  templateUrl: './admin-city.component.html',
  styleUrls: ['./admin-city.component.css']
})
export class AdminCityComponent implements OnInit {

  public sortedData: City[] = [];
  public city: City[] = [];
  public editCity = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  isLoginError = false;
  newCity: City = new City(null, '');
  editCityField: City = new City(null, '');
  successMessage = 'Населенный пункт добавлен успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

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

  AddCity() {
    this.spinner.show();
    this.adminService.AddCity(this.newCity).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getCities();
        this.showSnackBar(this.successMessage, this.successStyle);
        this.setObjectsToDefault();
      } else {
        this.showSnackBar(this.errorMessage, this.errorStyle);
      }
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
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

  edit(city: City) {
    this.editCity = true;
    this.editCityField.City = city.City;
    this.editCityField.Id = city.Id;
  }

  EditCity() {
    this.adminService.EditCity(this.editCityField).subscribe(next => {
      this.editCity = false;
      this.getCities();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }
  showSnackBar(message: string, typeClass: string) {
    this.snackBar.open(message, null, {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'center',
      panelClass: [typeClass]
    });
  }

  setObjectsToDefault() {
    this.newCity = new City(null, '');
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

