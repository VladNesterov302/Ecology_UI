import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SmallPredictionService {

  constructor(
    private http: HttpClient
  ) { }

  SmallPredictionRadiation(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/radiation/smallpredictionradiation?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionAzot(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/azot/smallpredictionazot?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionOzon(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/ozon/smallpredictionozon?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionPm(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/pm/smallpredictionpm?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionPm10(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/pm/smallpredictionpm10?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionSera(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/sera/smallpredictionsera?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionBioOxygen(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/biooxygen/smallpredictionbiooxygen?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionChemicalOxygen(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/chemicaloxygen/smallpredictionchemicaloxygen?id=${id}`;
    return this.http
      .get<number>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result;
        })
      );
  }
  SmallPredictionPh(id): Observable<number> {
    const url = `${environment.apiHostUrl}/api/ph/smallpredictionph?id=${id}`;
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
