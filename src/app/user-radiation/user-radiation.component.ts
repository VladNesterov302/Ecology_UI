import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';
import { Radiation } from './Models/radiation.model';
import { RadiationService } from './Services/radiation.service';

@Component({
  selector: 'app-user-radiation',
  templateUrl: './user-radiation.component.html',
  styleUrls: ['./user-radiation.component.css']
})
export class UserRadiationComponent implements OnInit {

  public sortedData: Radiation[] = [];
  public radiation: Radiation[] = [];
  public cities: City[] = [];
  public editRadiation = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  isLoginError = false;
  newRadiation: Radiation = new Radiation(null, null, null, null, '', null, '', '');
  editRadiationField: Radiation = new Radiation(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private radiationService: RadiationService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getRadiations();
    this.getCities();
  }

  AddRadiation() {
    this.spinner.show();
    this.newRadiation.IdUser = localStorage.getItem('userId');
    if (this.newRadiation.Dose < 0.1) {
      this.newRadiation.Level = 1
    }
    if (this.newRadiation.Dose >= 0.1 && this.newRadiation.Dose < 0.2) {
      this.newRadiation.Level = 2
    }
    if (this.newRadiation.Dose >= 0.2 && this.newRadiation.Dose < 0.3) {
      this.newRadiation.Level = 3
    }
    if (this.newRadiation.Dose >= 0.3 && this.newRadiation.Dose < 0.5) {
      this.newRadiation.Level = 4
    }
    if (this.newRadiation.Dose >= 0.5) {
      this.newRadiation.Level = 5
    }
    this.radiationService.AddRadiation(this.newRadiation).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getRadiations();
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

  getRadiations() {
    this.radiationService.getRadiations().toPromise().then(
      data => {
        console.log(data)
        this.radiation = data.slice();
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

  edit(radiation: Radiation) {
    this.editRadiation = true;
    this.editRadiationField.IdCity = radiation.IdCity;
    this.editRadiationField.Id = radiation.Id;
    this.editRadiationField.Dose = radiation.Dose;
    this.editRadiationField.Date = radiation.Date;
    this.editRadiationField.IdUser = localStorage.getItem('userId');
  }

  EditRadiation() {
    if (this.editRadiationField.Dose < 0.1) {
      this.editRadiationField.Level = 1
    }
    if (this.editRadiationField.Dose >= 0.1 && this.editRadiationField.Dose < 0.2) {
      this.editRadiationField.Level = 2
    }
    if (this.editRadiationField.Dose >= 0.2 && this.editRadiationField.Dose < 0.3) {
      this.editRadiationField.Level = 3
    }
    if (this.editRadiationField.Dose >= 0.3 && this.editRadiationField.Dose < 0.5) {
      this.editRadiationField.Level = 4
    }
    if (this.editRadiationField.Dose >= 0.5) {
      this.editRadiationField.Level = 5
    }
    this.radiationService.EditRadiation(this.editRadiationField).subscribe(next => {
      this.editRadiation = false;
      this.getRadiations();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delRadiation(id) {
    this.radiationService.DeleteRadiation(id).subscribe(next => {
      console.log(next)
      this.spinner.hide();
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getRadiations();
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
    this.newRadiation = new Radiation(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.radiation.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.radiation.findIndex(x => x.Id === currentStep);
    if (this.radiation[ind + 1] !== undefined) {
      this.step = this.radiation[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.radiation.findIndex(x => x.Id === currentStep);
    if (this.radiation[ind - 1] !== undefined) {
      this.step = this.radiation[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.radiation.slice();
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
        case 'Date':
          return compare(a.Date, b.Date, isAsc);
        case 'Dose':
          return compare(a.Dose, b.Dose, isAsc);
        case 'Level':
          return compare(a.Level, b.Level, isAsc);
        case 'User':
          return compare(a.User, b.User, isAsc);
        default:
          return 0;
      }
    });
  }

}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
