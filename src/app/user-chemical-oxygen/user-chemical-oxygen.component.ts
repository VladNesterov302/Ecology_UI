import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { WaterObject } from '../admin-water-object/Models/waterObject.model';
import { AdminService } from '../shared/admin.service';
import { ChemicalOxygen } from './Models/chemicaloxygen.model';
import { ChemicalOxygenService } from './Services/chemicaloxygen.service';

@Component({
  selector: 'app-user-chemical-oxygen',
  templateUrl: './user-chemical-oxygen.component.html',
  styleUrls: ['./user-chemical-oxygen.component.css']
})
export class UserChemicalOxygenComponent implements OnInit {
  public sortedData: ChemicalOxygen[] = [];
  public chemicalOxygen: ChemicalOxygen[] = [];
  public waterObjects: WaterObject[] = [];
  public editChemicalOxygen = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  newChemicalOxygen: ChemicalOxygen = new ChemicalOxygen(null, null, null, null, '', null, '', '');
  editChemicalOxygenField: ChemicalOxygen = new ChemicalOxygen(null, null, null, null, '', null, '', '');
  successDelMessage = 'Данные удалены успешно.';
  successMessage = 'Данные добавлены успешно.';
  errorMessage = 'Проверьте данные. Ошибка добавления.';
  successStyle = 'success-snackbar';
  errorStyle = 'error-snackbar';

  constructor(
    private adminService: AdminService,
    private chemicalOxygenService: ChemicalOxygenService,
    private router: Router,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public spinner: NgxSpinnerService
  ) { }

  ngOnInit() {
    this.getChemicalOxygens();
    this.getWaterObjects();
  }

  AddChemicalOxygen() {
    this.spinner.show();
    this.newChemicalOxygen.IdUser = localStorage.getItem('userId');
    if (this.newChemicalOxygen.Dose < 1) {
      this.newChemicalOxygen.Level = "Очень чистый"
    }
    if (this.newChemicalOxygen.Dose >= 1 && this.newChemicalOxygen.Dose < 2) {
      this.newChemicalOxygen.Level = "Чистый"
    }
    if (this.newChemicalOxygen.Dose >= 2 && this.newChemicalOxygen.Dose < 3) {
      this.newChemicalOxygen.Level = "Умеренно загрязненный"
    }
    if (this.newChemicalOxygen.Dose >= 3 && this.newChemicalOxygen.Dose < 4) {
      this.newChemicalOxygen.Level = "Загрязненный"
    }
    if (this.newChemicalOxygen.Dose >= 4 && this.newChemicalOxygen.Dose < 15) {
      this.newChemicalOxygen.Level = "Грязный"
    }
    if (this.newChemicalOxygen.Dose >= 15) {
      this.newChemicalOxygen.Level = "Очень грязный"
    }
    this.chemicalOxygenService.AddChemicalOxygen(this.newChemicalOxygen).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getChemicalOxygens();
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

  getChemicalOxygens() {
    this.chemicalOxygenService.getChemicalOxygens().toPromise().then(
      data => {
        this.chemicalOxygen = data.slice();
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

  edit(chemicalOxygen: ChemicalOxygen) {
    this.editChemicalOxygen = true;
    this.editChemicalOxygenField.IdWaterObject = chemicalOxygen.IdWaterObject;
    this.editChemicalOxygenField.Id = chemicalOxygen.Id;
    this.editChemicalOxygenField.Dose = chemicalOxygen.Dose;
    this.editChemicalOxygenField.Date = chemicalOxygen.Date;
    this.editChemicalOxygenField.IdUser = localStorage.getItem('userId');
  }

  EditChemicalOxygen() {
    if (this.editChemicalOxygenField.Dose < 1) {
      this.editChemicalOxygenField.Level = "Очень чистый"
    }
    if (this.editChemicalOxygenField.Dose >= 1 && this.editChemicalOxygenField.Dose < 2) {
      this.editChemicalOxygenField.Level = "Чистый"
    }
    if (this.editChemicalOxygenField.Dose >= 2 && this.editChemicalOxygenField.Dose < 3) {
      this.editChemicalOxygenField.Level = "Умеренно загрязненный"
    }
    if (this.editChemicalOxygenField.Dose >= 3 && this.editChemicalOxygenField.Dose < 4) {
      this.editChemicalOxygenField.Level = "Загрязненный"
    }
    if (this.editChemicalOxygenField.Dose >= 4 && this.editChemicalOxygenField.Dose < 15) {
      this.editChemicalOxygenField.Level = "Грязный"
    }
    if (this.editChemicalOxygenField.Dose >= 15) {
      this.editChemicalOxygenField.Level = "Очень грязный"
    }
    this.chemicalOxygenService.EditChemicalOxygen(this.editChemicalOxygenField).subscribe(next => {
      this.editChemicalOxygen = false;
      this.getChemicalOxygens();
    }, error => {
      console.log(error);
      this.spinner.hide();
    });
  }

  delChemicalOxygen(id) {
    this.spinner.show();
    this.chemicalOxygenService.DeleteChemicalOxygen(id).subscribe(next => {
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getChemicalOxygens();
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
    this.newChemicalOxygen = new ChemicalOxygen(null, null, null, null, '', null, '', '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.chemicalOxygen.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.chemicalOxygen.findIndex(x => x.Id === currentStep);
    if (this.chemicalOxygen[ind + 1] !== undefined) {
      this.step = this.chemicalOxygen[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.chemicalOxygen.findIndex(x => x.Id === currentStep);
    if (this.chemicalOxygen[ind - 1] !== undefined) {
      this.step = this.chemicalOxygen[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.chemicalOxygen;
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
