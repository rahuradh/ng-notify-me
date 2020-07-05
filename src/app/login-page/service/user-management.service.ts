import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { EventEntity } from 'src/app/application-page/entity/eventEntity';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  public isUserExist(userName, password): Observable<Boolean> {
    let parameters = new HttpParams();
    parameters = parameters.append('userName', userName);
    parameters = parameters.append('password', password);
    const opts = { params: parameters };
    var response = this.httpClient.get<Boolean>("/api/user/isUserExist", opts)
      .pipe(map((isExist: Boolean) => {
        return isExist;
      }), catchError(this.handleError<Boolean>('getEvents',))
      );
    return response;
  }

  public isUserNameExist(userName): Observable<Boolean> {
    let parameters = new HttpParams();
    parameters = parameters.append('userName', userName);
    const opts = { params: parameters };
    var response = this.httpClient.get<Boolean>("/api/user/isUserNameExist", opts)
      .pipe(map((isExist: Boolean) => {
        return isExist;
      }), catchError(this.handleError<Boolean>('getEvents',))
      );
    return response;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
