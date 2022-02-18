import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Ph } from '../Models/ph.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PhService {
  [x: string]: any;

  private URL_PH = `${environment.apiHostUrl}/api/ph`;

  constructor(
    private http: HttpClient
  ) { }

  AddPh(newPh: Ph): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_PH + '/addph';

    this.http.post(url, newPh).subscribe(
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
  getPhs(): Observable<Ph[]> {
    return this.http
      .get<Ph[]>(this.URL_PH + '/getphs')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Ph(item.Id, item.Dose, item.Level, 
            item.IdWaterObject, item.WaterObject, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditPh(ph: Ph): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_PH + '/editph', ph).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeletePh(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/ph/delph?id=${id}`;

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
