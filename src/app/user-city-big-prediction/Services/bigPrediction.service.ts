import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BigPredictionService {

  constructor(
    private http: HttpClient
  ) { }

  BigPredictionRadiation(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/radiation/bigpredictionradiation?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionAzot(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/azot/bigpredictionazot?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionOzon(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/ozon/bigpredictionozon?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionPm(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/pm/bigpredictionpm?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionPm10(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/pm/bigpredictionpm10?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionSera(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/sera/bigpredictionsera?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionBioOxygen(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/biooxygen/bigpredictionbiooxygen?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionChemicalOxygen(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/chemicaloxygen/bigpredictionchemicaloxygen?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  BigPredictionPh(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/ph/bigpredictionph?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
}
