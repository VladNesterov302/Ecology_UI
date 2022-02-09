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

const routes: Routes = [
  { path: '', redirectTo: '/main-page', pathMatch : 'full'},
  { path: 'main-page', component: MainPageComponent },
  { path: 'home', component: HomeComponent },
  { path: 'user-radiation', component: UserRadiationComponent },
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
