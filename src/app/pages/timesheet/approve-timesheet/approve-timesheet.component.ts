import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  hours: number;
}

@Component({
  selector: 'app-approve-timesheet',
  templateUrl: './approve-timesheet.component.html',
  styleUrls: ['./approve-timesheet.component.scss']
})
export class ApproveTimesheetComponent implements OnInit {

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['workerId', 'firstName', 'lastName', 'hours', 'action'];


  constructor() { }

  ngOnInit(): void {
    // Initialize your dataSource with actual data here
    this.dataSource.data = [
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      // Add more workers as needed
    ];


  }

  onCrossClick(worker: Worker): void {
    // Handle cross button click
    console.log('Cross clicked for worker:', worker);
  }

  onCorrectClick(worker: Worker): void {
    // Handle correct button click
    console.log('Correct clicked for worker:', worker);
  }
}
