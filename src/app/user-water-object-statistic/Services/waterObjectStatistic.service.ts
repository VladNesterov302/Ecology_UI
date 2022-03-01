import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import {LevelStatistic } from '../../user-statistic/Models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class WaterObjectStatisticService {

  constructor(
    private http: HttpClient
  ) { }

  getLevelBioOxygenStatistic(id: number): Observable<LevelStatistic[]> {
    const url = `${environment.apiHostUrl}/api/biooxygen/getwaterobjectbiooxygenstatistic?id=${id}`;
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
    const url = `${environment.apiHostUrl}/api/chemicaloxygen/getwaterobjectchemicaloxygenstatistic?id=${id}`;
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
    const url = `${environment.apiHostUrl}/api/ph/getwaterobjectphstatistic?id=${id}`;
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
