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
import { UserAzotComponent } from './user-azot/user-azot.component';
import { AzotService } from './user-azot/Services/azot.service';
import { FilterCityPipe } from './pipes/filterCity.pipe';
import { UserOzonComponent } from './user-ozon/user-ozon.component';
import { OzonService } from './user-ozon/Services/ozon.service';
import { UserPmComponent } from './user-pm/user-pm.component';
import { PmService } from './user-pm/Services/pm.service';
import { UserSeraComponent } from './user-sera/user-sera.component';
import { SeraService } from './user-sera/Services/sera.service';
import { UserPhComponent } from './user-ph/user-ph.component';
import { PhService } from './user-ph/Services/ph.service';
import { FilterWaterObjectPipe } from './pipes/filterWaterObject.pipe';
import { UserBioOxygenComponent } from './user-bio-oxygen/user-bio-oxygen.component';
import { BioOxygenService } from './user-bio-oxygen/Services/biooxygen.service';
import { UserChemicalOxygenComponent } from './user-chemical-oxygen/user-chemical-oxygen.component';
import { ChemicalOxygenService } from './user-chemical-oxygen/Services/chemicaloxygen.service';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { UserCityComponent } from './user-city/user-city.component';
import { UserCityStatisticComponent } from './user-city-statistic/user-city-statistic.component';
import { CityStatisticService } from './user-city-statistic/Services/cityStatistic.service';
import { StatisticService } from './user-statistic/Services/statistic.service';
import { UserWaterObjectComponent } from './user-water-object/user-water-object.component';
import { UserWaterObjectStatisticComponent } from './user-water-object-statistic/user-water-object-statistic.component';
import { WaterObjectStatisticService } from './user-water-object-statistic/Services/waterObjectStatistic.service';
import { UserCitySmallPredictionComponent } from './user-city-small-prediction/user-city-small-prediction.component';
import { SmallPredictionService } from './user-city-small-prediction/Services/smallPrediction.service';
import { UserCityBigPredictionComponent } from './user-city-big-prediction/user-city-big-prediction.component';
import { BigPredictionService } from './user-city-big-prediction/Services/bigPrediction.service';
import { UserWaterObjectSmallPredictionComponent } from './user-water-object-small-prediction/user-water-object-small-prediction.component';
import { UserWaterObjectBigPredictionComponent } from './user-water-object-big-prediction/user-water-object-big-prediction.component';

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
    FilterCityPipe,
    FilterWaterObjectPipe,
    AdminNavComponent,
    MainPageComponent,
    UserRegisterComponent,
    AdminCityComponent,
    AdminWaterObjectComponent,
    UserRadiationComponent,
    UserAzotComponent,
    UserOzonComponent,
    UserPmComponent,
    UserSeraComponent,
    UserPhComponent,
    UserBioOxygenComponent,
    UserChemicalOxygenComponent,
    UserStatisticComponent,
    UserCityComponent,
    UserCityStatisticComponent,
    UserWaterObjectComponent,
    UserWaterObjectStatisticComponent,
    UserCitySmallPredictionComponent,
    UserCityBigPredictionComponent,
    UserWaterObjectSmallPredictionComponent,
    UserWaterObjectBigPredictionComponent
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
    OverlayModule,
    NgApexchartsModule
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'ru-RU' },
    DatePipe,
    UserService,
    AdminService,
    GlobalService,
    RadiationService,
    AzotService,
    OzonService,
    PmService,
    SeraService,
    PhService,
    BioOxygenService,
    ChemicalOxygenService,
    CityStatisticService,
    StatisticService,
    WaterObjectStatisticService,
    SmallPredictionService,
    BigPredictionService,
    ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {}
}
