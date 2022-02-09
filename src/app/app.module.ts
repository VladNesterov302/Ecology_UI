import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatSidenavModule, MatIconModule,
   MatListModule, MAT_DATE_LOCALE } from '@angular/material';
import { MaterialModule } from './modules/material/material.module';
import { FileDropModule } from 'ngx-file-drop';

import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

import { UserService } from './shared/user.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sing-in/sing-in.component';
import { HomeComponent } from './home/home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MainNavComponent } from './main-nav/main-nav.component';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { GlobalService } from './shared/global.service';
import { DatePipe } from '@angular/common';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { AdminService } from './shared/admin.service';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MainPageComponent } from './main-page/main-page.component';

import { DateTimeFormatPipe } from './pipes/date-time-format.pipe';
import { DateFormatPipe } from './pipes/date-format.pipe';
import { FilterPipe } from './pipes/filter.pipe';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { AdminWaterObjectComponent } from './admin-water-object/admin-water-object.component';
import { UserRadiationComponent } from './user-radiation/user-radiation.component';
import { RadiationService } from './user-radiation/Services/radiation.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignInComponent,
    HomeComponent,
    AdminHomeComponent,
    AdminUsersComponent,
    MainNavComponent,
    DateTimeFormatPipe,
    DateFormatPipe,
    FilterPipe,
    AdminNavComponent,
    MainPageComponent,
    UserRegisterComponent,
    AdminCityComponent,
    AdminWaterObjectComponent,
    UserRadiationComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCheckboxModule,
    FileDropModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    NgxSpinnerModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    OverlayModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    DatePipe,
    UserService,
    AdminService,
    GlobalService,
    RadiationService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
