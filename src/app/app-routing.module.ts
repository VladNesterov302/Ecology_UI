import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sing-in/sing-in.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { MainPageComponent } from './main-page/main-page.component';
import { UserRegisterComponent } from './user-register/user-register.component';
import { AdminCityComponent } from './admin-city/admin-city.component';
import { AdminWaterObjectComponent } from './admin-water-object/admin-water-object.component';
import { UserRadiationComponent } from './user-radiation/user-radiation.component';
import { UserAzotComponent } from './user-azot/user-azot.component';
import { UserOzonComponent } from './user-ozon/user-ozon.component';
import { UserPmComponent } from './user-pm/user-pm.component';
import { UserSeraComponent } from './user-sera/user-sera.component';
import { UserPhComponent } from './user-ph/user-ph.component';
import { UserBioOxygenComponent } from './user-bio-oxygen/user-bio-oxygen.component';
import { UserChemicalOxygenComponent } from './user-chemical-oxygen/user-chemical-oxygen.component';
import { UserStatisticComponent } from './user-statistic/user-statistic.component';
import { UserCityComponent } from './user-city/user-city.component';
import { UserCityStatisticComponent } from './user-city-statistic/user-city-statistic.component';
import { UserWaterObjectComponent } from './user-water-object/user-water-object.component';
import { UserWaterObjectStatisticComponent } from './user-water-object-statistic/user-water-object-statistic.component';

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch : 'full'},
  { path: 'main-page', component: MainPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-radiation', component: UserRadiationComponent },
  { path: 'user-azot', component: UserAzotComponent },
  { path: 'user-ozon', component: UserOzonComponent },
  { path: 'user-pm', component: UserPmComponent },
  { path: 'user-sera', component: UserSeraComponent },
  { path: 'user-ph', component: UserPhComponent },
  { path: 'user-bio-oxygen', component: UserBioOxygenComponent },
  { path: 'user-chemical-oxygen', component: UserChemicalOxygenComponent },
  { path: 'user-statistic', component: UserStatisticComponent },
  { path: 'user-city', component: UserCityComponent },
  { path: 'user-water-object', component: UserWaterObjectComponent },
  { path: 'user-city-statistic', component: UserCityStatisticComponent },
  { path: 'user-water-object-statistic', component: UserWaterObjectStatisticComponent },
  { path: 'admin-home', component: AdminHomeComponent },
  { path: 'admin-users', component: AdminUsersComponent },
  { path: 'admin-user-register', component: UserRegisterComponent },
  { path: 'admin-cities', component: AdminCityComponent },
  { path: 'admin-water-objects', component: AdminWaterObjectComponent },
  { path: 'login', component: UserComponent, children: [{ path: '', component: SignInComponent }]},
  { path: 'login', component: UserComponent, pathMatch: 'full' },
  { path: '**', redirectTo: '/main-page'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
