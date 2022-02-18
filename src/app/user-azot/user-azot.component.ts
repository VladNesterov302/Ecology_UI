import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { City } from '../admin-city/Models/city.model';
import { AdminService } from '../shared/admin.service';
import { Azot } from './Models/azot.model';
import { AzotService } from './Services/azot.service';

@Component({
  selector: 'app-user-azot',
  templateUrl: './user-azot.component.html',
  styleUrls: ['./user-azot.component.css']
})
export class UserAzotComponent implements OnInit {

  public sortedData: Azot[] = [];
  public azot: Azot[] = [];
  public cities: City[] = [];
  public editAzot = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newAzot: Azot = new Azot(null, null, null, null, '', null, '', '');
  editAzotField: Azot = new Azot(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private azotService: AzotService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getAzots();
    this.getCities();
  }

  AddAzot() {
    this.spinner.show();
    this.newAzot.IdUser = localStorage.getItem('userId');
    if (this.newAzot.Dose <= 25) {
      this.newAzot.Level = "Норма"
    }
    if (this.newAzot.Dose > 25) {
      this.newAzot.Level = "Превышение"
    }
    
    this.azotService.AddAzot(this.newAzot).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getAzots();
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

  getAzots() {
    this.azotService.getAzots().toPromise().then(
      data => {
        this.azot = data.slice();
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

  edit(azot: Azot) {
    this.editAzot = true;
    this.editAzotField.IdCity = azot.IdCity;
    this.editAzotField.Id = azot.Id;
    this.editAzotField.Dose = azot.Dose;
    this.editAzotField.Date = azot.Date;
    this.editAzotField.IdUser = localStorage.getItem('userId');
  }

  EditAzot() {
    if (this.editAzotField.Dose <= 25) {
      this.editAzotField.Level = "Норма"
    }
    if (this.editAzotField.Dose > 25) {
      this.editAzotField.Level = "Превышение"
    }
    this.azotService.EditAzot(this.editAzotField).subscribe(next => {
      this.editAzot = false;
      this.getAzots();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delAzot(id) {
    this.spinner.show();
    this.azotService.DeleteAzot(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getAzots();
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
    this.newAzot = new Azot(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.azot.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.azot.findIndex(x => x.Id === currentStep);
    if (this.azot[ind + 1] !== undefined) {
      this.step = this.azot[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.azot.findIndex(x => x.Id === currentStep);
    if (this.azot[ind - 1] !== undefined) {
      this.step = this.azot[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.azot;
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
