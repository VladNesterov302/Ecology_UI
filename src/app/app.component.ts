import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'work';

  constructor(
    private router: Router
  ) { }

  ngOnInit() {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (accessToken != null && refreshToken != null) {
      const redirectPage = localStorage.getItem('lastPage');
      if (redirectPage != null) {
        this.router.navigate([redirectPage]);
      } else {
        this.router.navigate(['/main-page']);
      }
    }
  }
}
