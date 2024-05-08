import { Component, Input, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { TimesheetService } from 'src/app/shared/services/public-api';

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
export class SummaryComponent implements OnInit, AfterViewInit {
  @Input() timesheetid;
  @Input() timesheet;
  timesheetdata;
  workers;

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'status', 'planned_hours', 'total_hours', 'approved_hours', 'rejected_hours'];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private timesheetService: TimesheetService

  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let id = res?.data.timesheet_id
      this.timesheetService.getTimesheetWorkerSummary(id).subscribe(res => {
        this.workers = res?.data;;
        this.workers = this.workers.map((worker) => {
          console.log(worker.attendance)
          if (worker?.attendance != null) {
            worker.total_hours = worker?.attendance.total_hours
            worker.approved_hours = worker?.attendance.total_hours_approve
            worker.rejected_hours = worker?.attendance.total_hours_disapprove
          } else {
            worker.total_hours = 0
            worker.approved_hours = 0
            worker.rejected_hours = 0
          }
          return worker
        })
        console.log(this.workers)
        this.dataSource.data = this.workers;

      })
    })

  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchData() {
    this.timesheetService.getTimesheetWorkerSummary(this.timesheetdata.id).subscribe(res => {
      this.workers = res?.data;;
      this.workers = this.workers.map((worker) => {
        console.log(worker.attendance)
        if (worker?.attendance != null) {
          worker.total_hours = worker?.attendance.total_hours
          worker.approved_hours = worker?.attendance.total_hours_approve
          worker.rejected_hours = worker?.attendance.total_hours_disapprove
        } else {
          worker.total_hours = 0
          worker.approved_hours = 0
          worker.rejected_hours = 0
        }
        return worker
      })
      console.log(this.workers)
      this.dataSource.data = this.workers;

    })
  }

  exportEsv() {
    console.log(this.dataSource.data)
    let requiredData = this.dataSource.data.map((worker) => {
      let data = {
        worker_id: worker['worker_id'],
        first_name: worker['first_name'],
        last_name: worker['last_name'],
        status: worker['status'],
        planned_hours: worker['planned_hours'] == null ? 0 : worker['planned_hours'],
        total_hours: worker['total_hours'],
        approved_hours: worker['approved_hours'],
        rejected_hours: worker['rejected_hours'],

      }
      return data
    })

    new AngularCsv(requiredData, 'Summary', { headers: ['Worker Id', 'First Name', 'Last Name', 'Status', 'Planned Hours', 'Total Hours', 'Approved Hours', 'Rejected Hours'] })
  }
}

