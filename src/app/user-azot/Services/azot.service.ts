import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Azot } from '../Models/azot.model';

@Injectable({
  providedIn: 'root'
})
export class AzotService {
  [x: string]: any;

  private URL_AZOT = `${environment.apiHostUrl}/api/azot`;

  constructor(
    private http: HttpClient
  ) { }

  AddAzot(newAzot: Azot): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_AZOT + '/addazot';

    this.http.post(url, newAzot).subscribe(
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
  getAzots(): Observable<Azot[]> {
    return this.http
      .get<Azot[]>(this.URL_AZOT + '/getazots')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Azot(item.Id, item.Dose, item.Level, item.IdCity, item.City, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditAzot(azot: Azot): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_AZOT + '/editazot', azot).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteAzot(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/azot/delazot?id=${id}`;

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
