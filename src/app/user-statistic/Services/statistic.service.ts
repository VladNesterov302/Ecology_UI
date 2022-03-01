import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LevelRadiationStatistic, LevelStatistic } from '../Models/statistic.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticService {
  [x: string]: any;

  filesToSave: string[] = [];
  private URL_RADIATION = `${environment.apiHostUrl}/api/radiation`;
  private URL_AZOT = `${environment.apiHostUrl}/api/azot`;
  private URL_OZON = `${environment.apiHostUrl}/api/ozon`;
  private URL_PM = `${environment.apiHostUrl}/api/pm`;
  private URL_SERA = `${environment.apiHostUrl}/api/sera`;
  private URL_BIO = `${environment.apiHostUrl}/api/biooxygen`;
  private URL_CHEMICAL = `${environment.apiHostUrl}/api/chemicaloxygen`;
  private URL_PH = `${environment.apiHostUrl}/api/ph`;

  constructor(
    private http: HttpClient
  ) { }


  getLevelRadiationStatistic(): Observable<LevelRadiationStatistic[]> {
    return this.http
      .get<LevelRadiationStatistic[]>(this.URL_RADIATION + '/getlevelradiationstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelRadiationStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelAzotStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_AZOT + '/getlevelazotstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelOzonStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_OZON + '/getlevelozonstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPmStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_PM + '/getlevelpmstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPm10Statistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_PM + '/getlevelpm10statistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelSeraStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_SERA + '/getlevelserastatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelBioOxygenStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_BIO + '/getlevelbiooxygenstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelChemicalOxygenStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_CHEMICAL + '/getlevelchemicaloxygenstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
  getLevelPhStatistic(): Observable<LevelStatistic[]> {
    return this.http
      .get<LevelStatistic[]>(this.URL_PH + '/getlevelphstatistic')
      .pipe(
        map(res => {
          const result: any = res;
          return result.map(item => new LevelStatistic(item.Level, item.Number));
        })
      );
  }
}
