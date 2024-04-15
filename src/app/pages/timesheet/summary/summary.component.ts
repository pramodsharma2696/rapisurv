import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  status: boolean;
  plannedHours: number;
  totalHours: number;
  approvedHours: number;
  rejectedHours: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['workerId', 'firstName', 'lastName', 'status', 'plannedHours', 'totalHours', 'approvedHours', 'rejectedHours'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = [
      { workerId: 1, firstName: 'John', lastName: 'Doe', status: true, plannedHours: 40, totalHours: 45, approvedHours: 42, rejectedHours: 3 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', status: true, plannedHours: 40, totalHours: 45, approvedHours: 42, rejectedHours: 3 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', status: true, plannedHours: 40, totalHours: 45, approvedHours: 42, rejectedHours: 3 }
      // Add more workers as needed
    ];
  }

}

