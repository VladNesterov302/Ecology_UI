import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { SaveResult } from '../../shared/save-result.model';
import { Injectable } from '@angular/core';
import { ChemicalOxygen } from '../Models/chemicaloxygen.model';

@Injectable({
  providedIn: 'root'
})
export class ChemicalOxygenService {
  [x: string]: any;

  private URL_CHEMICAL = `${environment.apiHostUrl}/api/chemicaloxygen`;

  constructor(
    private http: HttpClient
  ) { }

  AddChemicalOxygen(newChemicalOxygen: ChemicalOxygen): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = this.URL_CHEMICAL + '/addchemicaloxygen';

    this.http.post(url, newChemicalOxygen).subscribe(
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
  getChemicalOxygens(): Observable<ChemicalOxygen[]> {
    return this.http
      .get<ChemicalOxygen[]>(this.URL_CHEMICAL + '/getchemicaloxygens')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new ChemicalOxygen(item.Id, item.Dose, item.Level,
            item.IdWaterObject, item.WaterObject, item.IdUser, item.User, item.Date));
        })
      );
  }
  EditChemicalOxygen(chemicalOxygen: ChemicalOxygen): Observable<number> {
    const result: Subject<number> = new Subject<number>();
    this.http.put(this.URL_CHEMICAL + '/editchemicaloxygen', chemicalOxygen).subscribe(
      res => {
        result.next();
      },
      err => {
        result.next();
      }
    );
    return result.asObservable();
  }
  DeleteChemicalOxygen(id: number): Observable<SaveResult> {
    const result: Subject<SaveResult> = new Subject<SaveResult>();
    const url = `${environment.apiHostUrl}/api/chemicaloxygen/delchemicaloxygen?id=${id}`;

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
