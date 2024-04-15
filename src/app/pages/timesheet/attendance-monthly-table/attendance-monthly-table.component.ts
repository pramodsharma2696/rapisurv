import { Component, OnInit } from '@angular/core';

export interface FieldWorker {
  id: number;
  firstName: string;
  lastName: string;
  date: string;
}

@Component({
  selector: 'app-attendance-monthly-table',
  templateUrl: './attendance-monthly-table.component.html',
  styleUrls: ['./attendance-monthly-table.component.scss']
})
export class AttendanceMonthlyTableComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  fieldWorkers: FieldWorker[] = [
    { id: 1, firstName: 'John', lastName: 'Doe', date: '9PM - 3AM' },
    { id: 2, firstName: 'Alice', lastName: 'Johnson', date: '9PM - 3AM' },
    { id: 3, firstName: 'Michael', lastName: 'Smith', date: '9PM - 3AM' },
    { id: 4, firstName: 'Emily', lastName: 'Brown', date: '9PM - 3AM' },
    { id: 5, firstName: 'David', lastName: 'Jones', date: '9PM - 3AM' },
    { id: 6, firstName: 'Sarah', lastName: 'Davis', date: '9PM - 3AM' },
    { id: 7, firstName: 'James', lastName: 'Wilson', date: '9PM - 3AM' },
    { id: 8, firstName: 'Olivia', lastName: 'Taylor', date: '9PM - 3AM' },
    { id: 9, firstName: 'Ethan', lastName: 'Anderson', date: '9PM - 3AM' },
    { id: 10, firstName: 'Emma', lastName: 'Martinez', date: '9PM - 3AM' }
  ];

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'date', 'date1', 'date2', 'date3','date4' ];

}
