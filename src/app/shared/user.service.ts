import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User, UserReg } from './user.model';
import { map } from 'rxjs/operators';

export interface Config {
  text: Blob;
}

@Injectable({
  providedIn: 'root'
})

export class UserService {
  readonly rootUrl = environment.apiHostUrl;
  constructor(private http: HttpClient) { }

  userAuthentication(userName, password): Observable<UserReg> {
    const url = `${environment.apiHostUrl}/api/user/signin`
    return this.http
      .get<UserReg>(url, this.getOptionsCustom(userName, password))
      .pipe(
        map(res => {
          if (res != null) {
            const result: any = res;
            return result;
          } else {
            return null;
          }
        })
      );
  }

  getUserInfo(userName): Observable<UserReg> {
    const url = `${environment.apiHostUrl}/api/user/getuserinfo`
    return this.http
      .get<UserReg>(url, this.getOptions(userName))
      .pipe(
        map(res => {
          if (res != null) {
            const result: any = res;
            return result;
          } else {
            return null;
          }
        })
      );
  }

  private getOptionsCustom(userName: string, password: string) {
    return {
      params: new HttpParams()
        .set('userName', userName)
        .set('password', password)
    };
  }

  private getOptions(userName: string) {
    return {
      params: new HttpParams()
        .set('userName', userName)
    };
  }

}
