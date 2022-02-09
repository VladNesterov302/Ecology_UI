import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar, PageEvent, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../shared/admin.service';
import { WaterObject } from './Models/waterObject.model';

@Component({
  selector: 'app-admin-water-object',
  templateUrl: './admin-water-object.component.html',
  styleUrls: ['./admin-water-object.component.css']
})
export class AdminWaterObjectComponent implements OnInit {

  public sortedData: WaterObject[] = [];
  public waterObject: WaterObject[] = [];
  public editWaterObject = false;
  pageSize = 10;
  pageIndex = 0;
  length = 0;
  step = 0;

  isLoginError = false;
  newWaterObject: WaterObject = new WaterObject(null, '');
  editWaterObjectField: WaterObject = new WaterObject(null, '');
  successMessage = 'Водный объект добавлен успешно.';
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
    this.getWaterObjects();
  }

  AddWaterObject() {
    this.spinner.show();
    this.adminService.AddWaterObject(this.newWaterObject).subscribe(next => {
      this.spinner.hide();
      if (next.error === false) {
        this.getWaterObjects();
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

  getWaterObjects() {
    this.adminService.getWaterObjects().toPromise().then(
      data => {
        this.waterObject = data.slice();
        this.sortedData = data.slice();
        this.setVariablesToDefault();
        this.step = this.sortedData[0].Id;
        this.length = this.sortedData.length;
        this.changePageEvent();
      });
  }

  edit(waterObject: WaterObject) {
    this.editWaterObject = true;
    this.editWaterObjectField.WaterObject = waterObject.WaterObject;
    this.editWaterObjectField.Id = waterObject.Id;
  }

  EditWaterObject() {
    this.adminService.EditWaterObject(this.editWaterObjectField).subscribe(next => {
      this.editWaterObject = false;
      this.getWaterObjects();
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
    this.newWaterObject = new WaterObject(null, '');
  }


  public changePageEvent(event?: PageEvent) {
    if (event != null) {
      this.pageIndex = event.pageIndex;
      this.pageSize = event.pageSize;
    }
    this.sortedData = (this.waterObject.slice(this.pageSize * this.pageIndex, this.pageSize * (this.pageIndex + 1)));
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
    const ind = this.waterObject.findIndex(x => x.Id === currentStep);
    if (this.waterObject[ind + 1] !== undefined) {
      this.step = this.waterObject[ind + 1].Id;
    }
  }

  prevStep(currentStep: number) {
    const ind = this.waterObject.findIndex(x => x.Id === currentStep);
    if (this.waterObject[ind - 1] !== undefined) {
      this.step = this.waterObject[ind - 1].Id;
    }
  }
  sortData(sort: Sort) {
    const data = this.waterObject.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'WaterObject':
          return compare(a.WaterObject, b.WaterObject, isAsc);
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
