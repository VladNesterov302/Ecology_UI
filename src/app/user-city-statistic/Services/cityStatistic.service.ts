import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LevelRadiationStatistic, LevelStatistic } from '../../user-statistic/Models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class CityStatisticService {

  constructor(
    private http: HttpClient
  ) { }

  getLevelRadiationStatistic(id: number): Observable<LevelRadiationStatistic[]> {
    const url = `${environment.apiHostUrl}/api/radiation/getcityradiationstatistic?id=${id}`;
    return this.http
      .get<LevelRadiationStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelRadiationStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelAzotStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/azot/getcityazotstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelOzonStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/ozon/getcityozonstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPmStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/pm/getcitypmstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPm10Statistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/pm/getcitypm10statistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelSeraStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/sera/getcityserastatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelBioOxygenStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/biooxygen/getcitybiooxygenstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelChemicalOxygenStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/chemicaloxygen/getcitychemicaloxygenstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPhStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/ph/getcityphstatistic?id=${id}`;
    return this.http
      .get<LevelStatistic[]>(url)
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
}
