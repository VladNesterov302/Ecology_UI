import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Sera } from '../Models/sera.model';

@Injectable({
  providedIn: 'root'
})
export class SeraService {
  [x: string]: any;

  private URL_SERA = `${environment.apiHostUrl}/api/sera`;

  constructor(
    private http: HttpClient
  ) { }

  AddSera(newSera: Sera): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_SERA + '/addsera';

    this.http.post(url, newSera).subscribe(
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
  getSeras(): Observable<Sera[]> {
    return this.http
      .get<Sera[]>(this.URL_SERA + '/getseras')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Sera(item.Id, item.Dose, item.Level, item.IdCity, item.City, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditSera(sera: Sera): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_SERA + '/editsera', sera).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteSera(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/sera/delsera?id=${id}`;

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
