import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatSnackBar, MatDialog, Sort } from '@angular/material';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdminService } from '../shared/admin.service';
import { UserReg } from '../shared/user.model';

@Component({
  selector: 'app-admin-users',
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.css']
})
export class AdminUsersComponent implements OnInit {

  public sortedData: UserReg[] = [];
  public users: UserReg[] = [];

  newUser: UserReg = new UserReg('', '', '', '', '', '', '', '','');
  successMessage = 'Success';
  successDelMessage = 'Success';
  errorMessage = 'Error';
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
    this.getUsers();
  }

  OnSubmit() {
    this.spinner.show();
    this.adminService.HrRegistration(this.newUser).subscribe(next => {
      console.log(next)
      this.spinner.hide();
      if (next.error === false) {
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

  getUsers() {
    this.adminService.getUsers().toPromise().then(
      data => {
        this.users = data.slice();
        this.sortedData = data.slice();
      });
  }

  deleteUser(Id) {
    this.adminService.DeleteUser(Id).subscribe(next => {
      console.log(next)
      this.spinner.hide();
      if (next.error === false) {
        this.showSnackBar(this.successDelMessage, this.successStyle);
        this.getUsers();
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
    this.newUser = new UserReg('', '', '', '', '', '', '', '','');
  }

  sortData(sort: Sort) {
    const data = this.users.slice();
    if (!sort.active || sort.direction === '') {
      this.sortedData = data;
      return;
    }

    this.sortedData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'Name':
          return compare(a.Name, b.Name, isAsc);
        case 'Surname':
          return compare(a.Surname, b.Surname, isAsc);
        case 'UserName':
          return compare(a.UserName, b.UserName, isAsc);
        case 'Email':
          return compare(a.Email, b.Email, isAsc);
        case 'RoleName':
          return compare(a.RoleName, b.RoleName, isAsc);
        default:
          return 0;
      }
    });
  }
 
}
function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}



