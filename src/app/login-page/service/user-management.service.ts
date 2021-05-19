import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  public isUserExist(userName, password): Observable<boolean> {
    let parameters = new HttpParams();
    parameters = parameters.append('userName', userName);
    parameters = parameters.append('password', password);
    const opts = { params: parameters };
    return this.httpClient.get<boolean>('/api/user/isUserExist', opts)
      .pipe(map((isExist: boolean) => {
        return isExist;
      }), catchError(this.handleError<boolean>('getEvents'))
      );
  }

  public isUserNameExist(userName): Observable<boolean> {
    let parameters = new HttpParams();
    parameters = parameters.append('userName', userName);
    const opts = { params: parameters };
    return this.httpClient.get<boolean>('/api/user/isUserNameExist', opts)
      .pipe(map((isExist: boolean) => {
        return isExist;
      }), catchError(this.handleError<boolean>('getEvents'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
