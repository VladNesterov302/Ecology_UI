import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WaterObject } from '../admin-water-object/Models/waterObject.model';
import { AdminService } from '../shared/admin.service';
import { BioOxygen } from './Models/biooxygen.model';
import { BioOxygenService } from './Services/biooxygen.service';

@Component({
  selector: 'app-user-bio-oxygen',
  templateUrl: './user-bio-oxygen.component.html',
  styleUrls: ['./user-bio-oxygen.component.css']
})
export class UserBioOxygenComponent implements OnInit {
  public sortedData: BioOxygen[] = [];
  public bioOxygen: BioOxygen[] = [];
  public waterObjects: WaterObject[] = [];
  public editBioOxygen = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newBioOxygen: BioOxygen = new BioOxygen(null, null, null, null, '', null, '', '');
  editBioOxygenField: BioOxygen = new BioOxygen(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private bioOxygenService: BioOxygenService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getBioOxygens();
    this.getWaterObjects();
  }

  AddBioOxygen() {
    this.spinner.show();
    this.newBioOxygen.IdUser = localStorage.getItem('userId');
    if (this.newBioOxygen.Dose < 1) {
      this.newBioOxygen.Level = "Очень чистый"
    }
    if (this.newBioOxygen.Dose >= 1 && this.newBioOxygen.Dose < 2) {
      this.newBioOxygen.Level = "Чистый"
    }
    if (this.newBioOxygen.Dose >= 2 && this.newBioOxygen.Dose < 3) {
      this.newBioOxygen.Level = "Умеренно загрязненный"
    }
    if (this.newBioOxygen.Dose >= 3 && this.newBioOxygen.Dose < 4) {
      this.newBioOxygen.Level = "Загрязненный"
    }
    if (this.newBioOxygen.Dose >= 4 && this.newBioOxygen.Dose < 10) {
      this.newBioOxygen.Level = "Грязный"
    }
    if (this.newBioOxygen.Dose >= 10) {
      this.newBioOxygen.Level = "Очень грязный"
    }
    this.bioOxygenService.AddBioOxygen(this.newBioOxygen).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getBioOxygens();
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

  getBioOxygens() {
    this.bioOxygenService.getBioOxygens().toPromise().then(
      data => {
        this.bioOxygen = data.slice();
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

  edit(bioOxygen: BioOxygen) {
    this.editBioOxygen = true;
    this.editBioOxygenField.IdWaterObject = bioOxygen.IdWaterObject;
    this.editBioOxygenField.Id = bioOxygen.Id;
    this.editBioOxygenField.Dose = bioOxygen.Dose;
    this.editBioOxygenField.Date = bioOxygen.Date;
    this.editBioOxygenField.IdUser = localStorage.getItem('userId');
  }

  EditBioOxygen() {
    if (this.editBioOxygenField.Dose < 1) {
      this.editBioOxygenField.Level = "Очень чистый"
    }
    if (this.editBioOxygenField.Dose >= 1 && this.editBioOxygenField.Dose < 2) {
      this.editBioOxygenField.Level = "Чистый"
    }
    if (this.editBioOxygenField.Dose >= 2 && this.editBioOxygenField.Dose < 3) {
      this.editBioOxygenField.Level = "Умеренно загрязненный"
    }
    if (this.editBioOxygenField.Dose >= 3 && this.editBioOxygenField.Dose < 4) {
      this.editBioOxygenField.Level = "Загрязненный"
    }
    if (this.editBioOxygenField.Dose >= 4 && this.editBioOxygenField.Dose < 10) {
      this.editBioOxygenField.Level = "Грязный"
    }
    if (this.editBioOxygenField.Dose >= 10) {
      this.editBioOxygenField.Level = "Очень грязный"
    }
    this.bioOxygenService.EditBioOxygen(this.editBioOxygenField).subscribe(next => {
      this.editBioOxygen = false;
      this.getBioOxygens();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delBioOxygen(id) {
    this.spinner.show();
    this.bioOxygenService.DeleteBioOxygen(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getBioOxygens();
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
    this.newBioOxygen = new BioOxygen(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.bioOxygen.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.bioOxygen.findIndex(x => x.Id === currentStep);
    if (this.bioOxygen[ind + 1] !== undefined) {
      this.step = this.bioOxygen[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.bioOxygen.findIndex(x => x.Id === currentStep);
    if (this.bioOxygen[ind - 1] !== undefined) {
      this.step = this.bioOxygen[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.bioOxygen;
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
