import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';
import { Pm } from './Models/pm.model';
import { PmService } from './Services/pm.service';

@Component({
  selector: 'app-user-pm',
  templateUrl: './user-pm.component.html',
  styleUrls: ['./user-pm.component.css']
})
export class UserPmComponent implements OnInit {
  public sortedData: Pm[] = [];
  public pm: Pm[] = [];
  public cities: City[] = [];
  public editPm = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newPm: Pm = new Pm(null, null, null, null, null, null, '', null, '', '');
  editPmField: Pm = new Pm(null, null, null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private pmService: PmService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getPms();
    this.getCities();
  }

  AddPm() {
    this.spinner.show();
    this.newPm.IdUser = localStorage.getItem('userId');
    if (this.newPm.Dose <= 15) {
      this.newPm.Level = "Норма"
    }
    if (this.newPm.Dose > 15) {
      this.newPm.Level = "Превышение"
    }
    if (this.newPm.Dose10 <= 45) {
      this.newPm.Level10 = "Норма"
    }
    if (this.newPm.Dose10 > 45) {
      this.newPm.Level10 = "Превышение"
    }
    this.pmService.AddPm(this.newPm).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getPms();
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

  getPms() {
    this.pmService.getPms().toPromise().then(
      data => {
        this.pm = data.slice();
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

  edit(pm: Pm) {
    this.editPm = true;
    this.editPmField.IdCity = pm.IdCity;
    this.editPmField.Id = pm.Id;
    this.editPmField.Dose = pm.Dose;
    this.editPmField.Dose10 = pm.Dose10;
    this.editPmField.Date = pm.Date;
    this.editPmField.IdUser = localStorage.getItem('userId');
  }

  EditPm() {
    if (this.editPmField.Dose <= 15) {
      this.editPmField.Level = "Норма"
    }
    if (this.editPmField.Dose > 15) {
      this.editPmField.Level = "Превышение"
    }
    if (this.editPmField.Dose10 <= 45) {
      this.editPmField.Level10 = "Норма"
    }
    if (this.editPmField.Dose10 > 45) {
      this.editPmField.Level10 = "Превышение"
    }
    this.pmService.EditPm(this.editPmField).subscribe(next => {
      this.editPm = false;
      this.getPms();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delPm(id) {
    this.spinner.show();
    this.pmService.DeletePm(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getPms();
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
    this.newPm = new Pm(null, null, null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.pm.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.pm.findIndex(x => x.Id === currentStep);
    if (this.pm[ind + 1] !== undefined) {
      this.step = this.pm[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.pm.findIndex(x => x.Id === currentStep);
    if (this.pm[ind - 1] !== undefined) {
      this.step = this.pm[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.pm;
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
        case 'Dose10':
          return compare(a.Dose10, b.Dose10, isAsc);
        case 'Level10':
          return compare(a.Level10, b.Level10, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

