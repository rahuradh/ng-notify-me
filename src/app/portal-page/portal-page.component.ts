import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { EventManagementService } from '../application-page/service/event-management.service';
import { EventEntity } from '../application-page/entity/eventEntity';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-portal-page',
  templateUrl: './portal-page.component.html',
  styleUrls: ['./portal-page.component.css']
})
export class PortalPageComponent implements OnInit {
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private _route: Router,
    private activeRoute: ActivatedRoute,
    private eventService: EventManagementService,
    private datePipe: DatePipe) { }

  displayedColumns: string[] = ['eventName', 'eventType', 'eventDate', 'notificationDays', 'status', 'createdDate', 'eventId', 'userName'];
  dataSource = new MatTableDataSource([]);;
  rowCount: number = 0;
  userName: string;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.dataSource.sort = this.sort;
    this.rowCount = this.dataSource.filteredData.length;
  }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(paramMap => {
      this.userName = paramMap.get('userName');
      console.log("User Name : " + this.userName);
      this.eventService.getEventsByUserName(this.userName)
        .subscribe(data => {
          this.dataSource = new MatTableDataSource(data as EventEntity[]);
          this.dataSource.sort = this.sort;
          this.rowCount = data.length;
        });
    });
  }

  goToInput() {
    this._route.navigate(['/input', this.userName, ""]);
  }

  goToDetailPage(rowData) {
    let eventEntity: EventEntity = {
      eventId: rowData.eventId,
      userName: rowData.userName,
      eventName: rowData.eventName,
      eventType: rowData.eventType,
      eventDate: rowData.eventDate,
      notificationDays: parseInt(rowData.notificationDays, 10),
      status: rowData.status == "On" ? true : false,
      createdDate: rowData.createdDate
    }
    this._route.navigate(['/detail', this.userName, eventEntity.eventId]);
  }

  logOut(){
    this._route.navigate(['/login']);
  }
}
