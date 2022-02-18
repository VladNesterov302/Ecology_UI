import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';
import { Ozon } from './Models/ozon.model';
import { OzonService } from './Services/ozon.service';

@Component({
  selector: 'app-user-ozon',
  templateUrl: './user-ozon.component.html',
  styleUrls: ['./user-ozon.component.css']
})
export class UserOzonComponent implements OnInit {

  public sortedData: Ozon[] = [];
  public ozon: Ozon[] = [];
  public cities: City[] = [];
  public editOzon = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newOzon: Ozon = new Ozon(null, null, null, null, '', null, '', '');
  editOzonField: Ozon = new Ozon(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private ozonService: OzonService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getOzons();
    this.getCities();
  }

  AddOzon() {
    this.spinner.show();
    this.newOzon.IdUser = localStorage.getItem('userId');
    if (this.newOzon.Dose <= 100) {
      this.newOzon.Level = "Норма"
    }
    if (this.newOzon.Dose > 100) {
      this.newOzon.Level = "Превышение"
    }

    this.ozonService.AddOzon(this.newOzon).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getOzons();
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

  getOzons() {
    this.ozonService.getOzons().toPromise().then(
      data => {
        this.ozon = data.slice();
        this.sortedData = data.slice();
        this.setVariablesToDefault();
        this.step = this.sortedData[0].Id;
        this.length = this.sortedData.length;
        this.changePageEvent();
      });
  }

  getCities() {
    this.adminService.getCities().toPromise().then(
      data => {
        this.cities = data;
      });
  }

  edit(ozon: Ozon) {
    this.editOzon = true;
    this.editOzonField.IdCity = ozon.IdCity;
    this.editOzonField.Id = ozon.Id;
    this.editOzonField.Dose = ozon.Dose;
    this.editOzonField.Date = ozon.Date;
    this.editOzonField.IdUser = localStorage.getItem('userId');
  }

  EditOzon() {
    if (this.editOzonField.Dose <= 100) {
      this.editOzonField.Level = "Норма"
    }
    if (this.editOzonField.Dose > 100) {
      this.editOzonField.Level = "Превышение"
    }
    this.ozonService.EditOzon(this.editOzonField).subscribe(next => {
      this.editOzon = false;
      this.getOzons();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delOzon(id) {
    this.spinner.show();
    this.ozonService.DeleteOzon(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getOzons();
        this.spinner.hide();
      } else {
        this.showSnackBar(this.errorMessage, this.errorStyle);
      }
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
    this.newOzon = new Ozon(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.ozon.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.ozon.findIndex(x => x.Id === currentStep);
    if (this.ozon[ind + 1] !== undefined) {
      this.step = this.ozon[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.ozon.findIndex(x => x.Id === currentStep);
    if (this.ozon[ind - 1] !== undefined) {
      this.step = this.ozon[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.ozon;
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Id':
          return compare(a.Id, b.Id, isAsc);
        case 'Date':
          return compare(a.Date, b.Date, isAsc);
        case 'Dose':
          return compare(a.Dose, b.Dose, isAsc);
        case 'Level':
          return compare(a.Level, b.Level, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
