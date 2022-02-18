import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Ozon } from '../Models/ozon.model';

@Injectable({
  providedIn: 'root'
})
export class OzonService {
  [x: string]: any;

  private URL_OZON = `${environment.apiHostUrl}/api/ozon`;

  constructor(
    private http: HttpClient
  ) { }

  AddOzon(newOzon: Ozon): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_OZON + '/addozon';

    this.http.post(url, newOzon).subscribe(
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
  getOzons(): Observable<Ozon[]> {
    return this.http
      .get<Ozon[]>(this.URL_OZON + '/getozons')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Ozon(item.Id, item.Dose, item.Level, item.IdCity, item.City, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditOzon(ozon: Ozon): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_OZON + '/editozon', ozon).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteOzon(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/ozon/delozon?id=${id}`;

    this.http.get(url).subscribe(
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

}
