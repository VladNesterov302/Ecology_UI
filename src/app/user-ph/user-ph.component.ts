import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WaterObject } from '../admin-water-object/Models/waterObject.model';
import { AdminService } from '../shared/admin.service';
import { Ph } from './Models/ph.model';
import { PhService } from './Services/ph.service';

@Component({
  selector: 'app-user-ph',
  templateUrl: './user-ph.component.html',
  styleUrls: ['./user-ph.component.css']
})
export class UserPhComponent implements OnInit {
  public sortedData: Ph[] = [];
  public ph: Ph[] = [];
  public waterObjects: WaterObject[] = [];
  public editPh = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newPh: Ph = new Ph(null, null, null, null, '', null, '', '');
  editPhField: Ph = new Ph(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private phService: PhService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getPhs();
    this.getWaterObjects();
  }

  AddPh() {
    this.spinner.show();
    this.newPh.IdUser = localStorage.getItem('userId');
    if (this.newPh.Dose < 3) {
      this.newPh.Level = "Сильнокислые воды"
    }
    if (this.newPh.Dose >= 3 && this.newPh.Dose < 5) {
      this.newPh.Level = "Кислые воды"
    }
    if (this.newPh.Dose >= 5 && this.newPh.Dose < 6.5) {
      this.newPh.Level = "Слабокислые воды"
    }
    if (this.newPh.Dose >= 6.5 && this.newPh.Dose < 7.5) {
      this.newPh.Level = "Нейтральные воды"
    }
    if (this.newPh.Dose >= 7.5 && this.newPh.Dose < 8.5) {
      this.newPh.Level = "Слабощелочные воды"
    }
    if (this.newPh.Dose >= 8.5 && this.newPh.Dose < 9.5) {
      this.newPh.Level = "Щелочные воды"
    }
    if (this.newPh.Dose >= 9.5) {
      this.newPh.Level = "Сильнощелочные воды"
    }
    this.phService.AddPh(this.newPh).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getPhs();
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

  getPhs() {
    this.phService.getPhs().toPromise().then(
      data => {
        this.ph = data.slice();
        this.sortedData = data.slice();
        this.setVariablesToDefault();
        this.step = this.sortedData[0].Id;
        this.length = this.sortedData.length;
        this.changePageEvent();
      });
  }

  getWaterObjects() {
    this.adminService.getWaterObjects().toPromise().then(
      data => {
        this.waterObjects = data;
        console.log(this.waterObjects)
      });
  }

  edit(ph: Ph) {
    this.editPh = true;
    this.editPhField.IdWaterObject = ph.IdWaterObject;
    this.editPhField.Id = ph.Id;
    this.editPhField.Dose = ph.Dose;
    this.editPhField.Date = ph.Date;
    this.editPhField.IdUser = localStorage.getItem('userId');
  }

  EditPh() {
    if (this.editPhField.Dose < 3) {
      this.editPhField.Level = "Сильнокислые воды"
    }
    if (this.editPhField.Dose >= 3 && this.editPhField.Dose < 5) {
      this.editPhField.Level = "Кислые воды"
    }
    if (this.editPhField.Dose >= 5 && this.editPhField.Dose < 6.5) {
      this.editPhField.Level = "Слабокислые воды"
    }
    if (this.editPhField.Dose >= 6.5 && this.editPhField.Dose < 7.5) {
      this.editPhField.Level = "Нейтральные воды"
    }
    if (this.editPhField.Dose >= 7.5 && this.editPhField.Dose < 8.5) {
      this.editPhField.Level = "Слабощелочные воды"
    }
    if (this.editPhField.Dose >= 8.5 && this.editPhField.Dose < 9.5) {
      this.editPhField.Level = "Щелочные воды"
    }
    if (this.editPhField.Dose >= 9.5) {
      this.editPhField.Level = "Сильнощелочные воды"
    }
    this.phService.EditPh(this.editPhField).subscribe(next => {
      this.editPh = false;
      this.getPhs();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delPh(id) {
    this.spinner.show();
    this.phService.DeletePh(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getPhs();
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
    this.newPh = new Ph(null,  null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.ph.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.ph.findIndex(x => x.Id === currentStep);
    if (this.ph[ind + 1] !== undefined) {
      this.step = this.ph[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.ph.findIndex(x => x.Id === currentStep);
    if (this.ph[ind - 1] !== undefined) {
      this.step = this.ph[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.ph;
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
