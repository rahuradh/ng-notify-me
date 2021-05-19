import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { EventEntity } from '../entity/eventEntity';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DatePipe } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class EventManagementService {

  constructor(private httpClient: HttpClient, private datePipe: DatePipe) { }

  public saveEvent(eventModel) {
    this.httpClient.post('/api/event/addNewEvent', eventModel).toPromise().then(data => {
      console.log(data);
    });
  }

  public updateEvent(eventModel) {
    this.httpClient.post('/api/event/updateEvent', eventModel).toPromise().then(data => {
      console.log(data);
    });
  }

  public deleteEvent(eventModel) {
    this.httpClient.post('/api/event/deleteEvent', eventModel).toPromise().then(data => {
      console.log(data);
    });
  }

  public getAllEvents(): Observable<EventEntity[]> {
    const gridValueList = [];
    return this.httpClient.get<EventEntity[]>('/api/event/getAllEvents')
      .pipe(
        map((datas: EventEntity[]) => {
          datas.forEach((key, val) => {
            const eventStatus: string = (key.status) ? 'On' : 'Off';
            const eventDateFormated: string = this.datePipe.transform(new Date(key.eventDate), 'EEEE, MMMM d, y');
            const createdDateFormated: string = this.datePipe.transform(new Date(key.createdDate), 'MMMM d, y');
            const gridValue = {
              eventId: key.eventId,
              userName: key.userName,
              eventName: key.eventName,
              eventType: key.eventType,
              eventDate: eventDateFormated,
              notificationDays: key.notificationDays,
              status: eventStatus,
              createdDate: createdDateFormated
            };
            gridValueList.push(gridValue);
          });
          return gridValueList;
        }), catchError(this.handleError<EventEntity[]>('getEvents', []))
      );
  }

  public getEventsByUserName(username): Observable<EventEntity[]> {
    const opts = { params: new HttpParams({ fromString: 'userName=' + username }) };
    const gridValueList = [];
    return this.httpClient.get<EventEntity[]>('/api/event/getEventsByUserName', opts)
      .pipe(
        map((datas: EventEntity[]) => {
          datas.forEach((key, val) => {
            const eventStatus: string = (key.status) ? 'On' : 'Off';
            const eventDateFormated: string = this.datePipe.transform(new Date(key.eventDate), 'EEEE, MMMM d, y');
            const createdDateFormated: string = this.datePipe.transform(new Date(key.createdDate), 'MMMM d, y');
            const gridValue = {
              eventId: key.eventId,
              userName: key.userName,
              eventName: key.eventName,
              eventType: key.eventType,
              eventDate: eventDateFormated,
              notificationDays: key.notificationDays,
              status: eventStatus,
              createdDate: createdDateFormated
            };
            gridValueList.push(gridValue);
          });
          return gridValueList;
        }), catchError(this.handleError<EventEntity[]>('getEvents', []))
      );
  }

  public getEventById(eventId): Observable<EventEntity> {
    const opts = { params: new HttpParams({ fromString: 'eventId=' + eventId }) };
    return this.httpClient.get<EventEntity>('/api/event/getEventById', opts)
      .pipe(
        map((data: EventEntity) => {
          return data;
        }), catchError(this.handleError<EventEntity>('getEvents'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
