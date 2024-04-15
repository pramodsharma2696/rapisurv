import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

// Interface for Worker
export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  status: string;
  plannedHours: number;
}

@Component({
  selector: 'app-manage-worker',
  templateUrl: './manage-worker.component.html',
  styleUrls: ['./manage-worker.component.scss']
})
export class ManageWorkerComponent implements OnInit {
  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['workerId', 'firstName', 'lastName', 'status', 'plannedHours'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.data = [
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},

    ];
  }

}
