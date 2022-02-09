import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { User, UserReg } from './user.model';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from './save-result.model';
import { City } from '../admin-city/Models/city.model';
import { WaterObject } from '../admin-water-object/Models/waterObject.model';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  [x: string]: any;
  private URL_REG = `${environment.apiHostUrl}/api/userregistration`;

  private URL_USER = `${environment.apiHostUrl}/api/user`;
  private URL_CITY = `${environment.apiHostUrl}/api/city`;
  private URL_WATER = `${environment.apiHostUrl}/api/waterobject`;

  constructor(
    private http: HttpClient
  ) { }


  UserRegistration(newUser: UserReg): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const urlDoc = this.URL_REG + '/adduser';

    this.http.post(urlDoc, newUser).subscribe(
      res => {
        if (res)
          result.next(new SaveResult(false));
        else
          result.next(new SaveResult(true));
      },
      error => {
        result.next(new SaveResult(true));
      });

    return result.asObservable();
  }



  Block(id: string): Observable<SaveResult> {
    const url = `${environment.apiHostUrl}/api/user/block?id=${id}`;
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    this.http.get(url).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  Unblock(id: string): Observable<SaveResult> {
    const url = `${environment.apiHostUrl}/api/user/unblock?id=${id}`;
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    this.http.get(url).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }

  getUsers(): Observable<UserReg[]> {
    return this.http
      .get<UserReg[]>(this.URL_USER + '/getusers')
      .pipe(
        map(res => {
          const result: any = res;
          console.log(result)
          return result.map(item => new UserReg(item.Id, item.Name, item.Surname, item.Created, item.Email, item.Password, item.UserName, item.RoleId, item.Role.RoleName, item.Status));
        })
      );
  }

  AddCity(newCity: City): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_CITY + '/addcity';

    this.http.post(url, newCity).subscribe(
      res => {
        if (res)
          result.next(new SaveResult(false));
        else
          result.next(new SaveResult(true));
      },
      error => {
        result.next(new SaveResult(true));
      });

    return result.asObservable();
  }
  getCities(): Observable<City[]> {
    return this.http
      .get<City[]>(this.URL_CITY + '/getcities')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new City(item.Id, item.City));
        })
      );
  }
  EditCity(city: City): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_CITY + '/editcity', city).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }

  AddWaterObject(newWaterObject: WaterObject): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_WATER + '/addwaterobject';

    this.http.post(url, newWaterObject).subscribe(
      res => {
        if (res)
          result.next(new SaveResult(false));
        else
          result.next(new SaveResult(true));
      },
      error => {
        result.next(new SaveResult(true));
      });

    return result.asObservable();
  }
  getWaterObjects(): Observable<WaterObject[]> {
    return this.http
      .get<WaterObject[]>(this.URL_WATER + '/getwaterobjects')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new WaterObject(item.Id, item.WaterObject));
        })
      );
  }
  EditWaterObject(waterObject: WaterObject): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_WATER + '/editwaterobject', waterObject).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
}
