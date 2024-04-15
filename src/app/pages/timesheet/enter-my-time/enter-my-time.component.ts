import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  hours: number;
}

export interface WeekDay {
  date: string;
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
}

@Component({
  selector: 'app-enter-my-time',
  templateUrl: './enter-my-time.component.html',
  styleUrls: ['./enter-my-time.component.scss']
})
export class EnterMyTimeComponent implements OnInit {
  dataSource = new MatTableDataSource<Worker>();
  
  displayedColumns: string[] = ['workerId', 'firstName', 'lastName', 'hours'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = [
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
      { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 }
      // Add more workers as needed
    ];
  }

}
