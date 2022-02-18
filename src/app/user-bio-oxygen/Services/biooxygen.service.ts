import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Injectable } from '@angular/core';
import { BioOxygen } from '../Models/biooxygen.model';

@Injectable({
  providedIn: 'root'
})
export class BioOxygenService {
  [x: string]: any;

  private URL_BIO = `${environment.apiHostUrl}/api/biooxygen`;

  constructor(
    private http: HttpClient
  ) { }

  AddBioOxygen(newBioOxygen: BioOxygen): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_BIO + '/addbiooxygen';

    this.http.post(url, newBioOxygen).subscribe(
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
  getBioOxygens(): Observable<BioOxygen[]> {
    return this.http
      .get<BioOxygen[]>(this.URL_BIO + '/getbiooxygens')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new BioOxygen(item.Id, item.Dose, item.Level,
            item.IdWaterObject, item.WaterObject, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditBioOxygen(bioOxygen: BioOxygen): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_BIO + '/editbiooxygen', bioOxygen).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteBioOxygen(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/biooxygen/delbiooxygen?id=${id}`;

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
