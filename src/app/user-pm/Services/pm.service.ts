import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Pm } from '../Models/pm.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PmService {
  [x: string]: any;

  private URL_PM = `${environment.apiHostUrl}/api/pm`;

  constructor(
    private http: HttpClient
  ) { }

  AddPm(newPm: Pm): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_PM + '/addpm';

    this.http.post(url, newPm).subscribe(
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
  getPms(): Observable<Pm[]> {
    return this.http
      .get<Pm[]>(this.URL_PM + '/getpms')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Pm(item.Id, item.Dose, item.Level, item.Dose10, item.Level10,
            item.IdCity, item.City, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditPm(pm: Pm): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_PM + '/editpm', pm).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeletePm(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/pm/delpm?id=${id}`;

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
