import { logging } from 'protractor';
import { EventManagementService } from './service/event-management.service';
import { Component, OnInit, OnDestroy, ViewChildren, AfterViewInit, OnChanges, AfterContentInit } from '@angular/core';
import { EventEntity } from './entity/eventEntity';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/internal/operators/map';
import { Subject, interval } from 'rxjs';
import { takeUntil, startWith, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-application-page',
  templateUrl: './application-page.component.html',
  styleUrls: ['./application-page.component.css']
})
export class ApplicationPageComponent implements OnInit, OnDestroy, AfterViewInit, AfterContentInit {
  eventModel: EventEntity;
  userName: string;
  screenTitle: string;
  minDate = new Date(1800, 0, 1);
  maxDate = new Date(2382, 0, 1);
  eventTypes: any[] = [
    { name: 'Birthday' },
    { name: 'Anniversary' },
    { name: 'Others' }
  ];
  deleteButtonDispaly: boolean;
  copyButtonDispaly: boolean;
  editButtonDispaly: boolean;
  updateButtonDispaly: boolean;
  saveButtonDispaly: boolean;
  isReadOnly: boolean;
  isEventNameError: boolean = false;
  isEventDateError: boolean = false;
  isSaveButtonEnabled: boolean = false;
  isRequredFields: boolean = false;

  constructor(private _route: Router,
    private activeRoute: ActivatedRoute,
    private eventService: EventManagementService,
    private datePipe: DatePipe,
    private _snackBar: MatSnackBar) {
    this.eventModel = new EventEntity('', '', '', 'Birthday', this.datePipe.transform(Date.now(), "yyyy-MM-dd"), 0, true, '');
    this.isReadOnly = true;
    this.screenTitle = "NotifyMe Application Detail Page";
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

  ngAfterContentInit(): void {
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap => {
      var eventId = paramMap.get('eventId');
      this.userName = paramMap.get('userName');
      if (eventId != "") {
        this.eventService.getEventById(eventId).subscribe(data => {
          if (data != null) {
            this.eventModel = data as EventEntity;
            this.deleteButtonDispaly = true;
            this.copyButtonDispaly = true;
            this.editButtonDispaly = true;
            this.updateButtonDispaly = false;
            this.saveButtonDispaly = false;
            this.isReadOnly = true;
            this.isRequredFields = true;
            this._snackBar.open("Detail page has been successfully loaded.", "", {
              duration: 2000,
              verticalPosition: 'bottom',
              horizontalPosition: 'left'
            });
          } else {
            this._route.navigate(['/input', this.userName, ""]);
          }
        });
      } else {
        this.setInputScreen();
      }
    });

  }
  setInputScreen() {
    this.screenTitle = "NotifyMe Application Input Page";
    this.deleteButtonDispaly = false;
    this.copyButtonDispaly = false;
    this.editButtonDispaly = false;
    this.updateButtonDispaly = false;
    this.saveButtonDispaly = true;
    this.isReadOnly = false;
    this.isRequredFields = false;
  }

  saveEvent() {
    console.log("Data On Save : " + JSON.stringify(this.eventModel));
    let isError = false;
    if (this.eventModel.eventName.trim() == "") {
      this.eventModel.eventName = "";
      this.isEventNameError = true;
      isError = true;
    } else {
      this.isEventNameError = false;
    }
    if (this.eventModel.eventDate == null || this.eventModel.eventDate == "") {
      this.isEventDateError = true;
      isError = true;
    } else {
      this.isEventDateError = false;
    }
    if (!isError) {
      this.eventModel.userName = this.userName;
      this.eventModel.eventDate = this.datePipe.transform(new Date(this.eventModel.eventDate), "yyyy-MM-dd");
      this.eventModel.createdDate = this.datePipe.transform(new Date(), "yyyy-MM-dd");
      this.eventService.saveEvent(this.eventModel);
      this._snackBar.open("Event has been successfully saved.", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left'
      });
      this.deleteButtonDispaly = true;
      this.copyButtonDispaly = true;
      this.editButtonDispaly = true;
      this.updateButtonDispaly = false;
      this.saveButtonDispaly = false;
      this.isReadOnly = true;
      this.isRequredFields = true;
    } else {
      this._snackBar.open("Please fill the mandatory fields.", "", {
        duration: 2000,
        verticalPosition: 'bottom',
        horizontalPosition: 'left',
        panelClass: ['red-snackbar']
      });
    }
  }
  backToPortal() {
    this._route.navigate(['/portal', this.userName]);
  }
  editEvent() {
    this.deleteButtonDispaly = false;
    this.copyButtonDispaly = false;
    this.editButtonDispaly = false;
    this.updateButtonDispaly = true;
    this.saveButtonDispaly = false;
    this.isReadOnly = false;
  }
  deleteEvent() {
    this.eventService.deleteEvent(this.eventModel);
    this._snackBar.open("Event has been successfully deleted.", "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
    this._route.navigate(['/portal', this.userName]);
  }
  updateEvent() {
    this.eventModel.eventDate = this.datePipe.transform(new Date(this.eventModel.eventDate), "yyyy-MM-dd");
    this.eventService.updateEvent(this.eventModel);
    this._snackBar.open("Event has been successfully updated.", "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
    this.deleteButtonDispaly = true;
    this.copyButtonDispaly = true;
    this.editButtonDispaly = true;
    this.updateButtonDispaly = false;
    this.saveButtonDispaly = false;
    this.isReadOnly = true;
  }

  copyEvent() {
    this._snackBar.open("Event has been successfully copied.", "", {
      duration: 2000,
      verticalPosition: 'bottom',
      horizontalPosition: 'left'
    });
    this.deleteButtonDispaly = false;
    this.copyButtonDispaly = false;
    this.editButtonDispaly = false;
    this.updateButtonDispaly = false;
    this.saveButtonDispaly = true;
    this.isReadOnly = false;
  }

  logOut() {
    this._route.navigate(['/login']);
  }
}