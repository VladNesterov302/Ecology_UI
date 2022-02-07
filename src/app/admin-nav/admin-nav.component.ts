import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { GlobalService } from '../shared/global.service';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
})
export class AdminNavComponent implements OnInit {
  public userName = '';
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private globalService: GlobalService
    ) {
    }

    ngOnInit () {
      this.userName = localStorage.getItem('userName');
    }

  Profile() {
    this.router.navigate(['/admin-home']);
  }

  Logout() {
    localStorage.clear();
    this.router.navigate(['/main-page']);
  }
}
