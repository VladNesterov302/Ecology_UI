import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Radiation } from '../Models/radiation.model';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';

@Injectable({
  providedIn: 'root'
})
export class RadiationService {
  [x: string]: any;

  private URL_RADIATION= `${environment.apiHostUrl}/api/radiation`;

  constructor(
    private http: HttpClient
  ) { }

  AddRadiation(newRadiation: Radiation): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_RADIATION + '/addradiation';

    this.http.post(url, newRadiation).subscribe(
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
  getRadiations(): Observable<Radiation[]> {
    return this.http
      .get<Radiation[]>(this.URL_RADIATION + '/getradiations')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new Radiation(item.Id, item.Dose, item.Level, item.IdCity, item.City, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditRadiation(radiation: Radiation): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_RADIATION + '/editradiation', radiation).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteRadiation(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/radiation/delradiation?id=${id}`;

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
