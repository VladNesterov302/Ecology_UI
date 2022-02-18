import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';
import { Sera } from './Models/sera.model';
import { SeraService } from './Services/sera.service';

@Component({
  selector: 'app-user-sera',
  templateUrl: './user-sera.component.html',
  styleUrls: ['./user-sera.component.css']
})
export class UserSeraComponent implements OnInit {

  public sortedData: Sera[] = [];
  public sera: Sera[] = [];
  public cities: City[] = [];
  public editSera = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newSera: Sera = new Sera(null, null, null, null, '', null, '', '');
  editSeraField: Sera = new Sera(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private seraService: SeraService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getSeras();
    this.getCities();
  }

  AddSera() {
    this.spinner.show();
    this.newSera.IdUser = localStorage.getItem('userId');
    if (this.newSera.Dose <= 40) {
      this.newSera.Level = "Норма"
    }
    if (this.newSera.Dose > 40) {
      this.newSera.Level = "Превышение"
    }

    this.seraService.AddSera(this.newSera).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getSeras();
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

  getSeras() {
    this.seraService.getSeras().toPromise().then(
      data => {
        this.sera = data.slice();
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

  edit(sera: Sera) {
    this.editSera = true;
    this.editSeraField.IdCity = sera.IdCity;
    this.editSeraField.Id = sera.Id;
    this.editSeraField.Dose = sera.Dose;
    this.editSeraField.Date = sera.Date;
    this.editSeraField.IdUser = localStorage.getItem('userId');
  }

  EditSera() {
    if (this.editSeraField.Dose <= 40) {
      this.editSeraField.Level = "Норма"
    }
    if (this.editSeraField.Dose > 40) {
      this.editSeraField.Level = "Превышение"
    }
    this.seraService.EditSera(this.editSeraField).subscribe(next => {
      this.editSera = false;
      this.getSeras();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delSera(id) {
    this.spinner.show();
    this.seraService.DeleteSera(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getSeras();
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
    this.newSera = new Sera(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.sera.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.sera.findIndex(x => x.Id === currentStep);
    if (this.sera[ind + 1] !== undefined) {
      this.step = this.sera[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.sera.findIndex(x => x.Id === currentStep);
    if (this.sera[ind - 1] !== undefined) {
      this.step = this.sera[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.sera;
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
