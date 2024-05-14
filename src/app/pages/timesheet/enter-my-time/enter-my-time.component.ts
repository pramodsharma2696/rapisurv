import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { EnterAttendanceModalComponent } from '../enter-attendance-modal/enter-attendance-modal.component';
import { EnterTimeAssignedTaskModalComponent } from '../enter-time-assigned-task-modal/enter-time-assigned-task-modal.component';
import { MatPaginator } from '@angular/material/paginator';

export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  total_hours: number;
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
export class EnterMyTimeComponent implements OnInit, AfterViewInit {

  @Input() timesheetid;
  @Input() timesheet;
  
  timesheetdata;
  workersdata;

  dataSource = new MatTableDataSource<Worker>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[];
  selectedDate;

  calculate_hours: boolean = false
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,

  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.selectedDate = this.getTodayDate();
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      console.log("enter my time")
      console.log(this.timesheetdata)
      this.calculate_hours = this.timesheetdata.hours == '1';
      console.log(this.calculate_hours)
      if (this.calculate_hours) {
        this.displayedColumns = ['worker_id', 'first_name', 'last_name', 'attendance', 'assigned_task', 'total_hours'];
      } else {
        this.displayedColumns = ['worker_id', 'first_name', 'last_name', 'assigned_task', 'total_hours'];
      }

      this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
        console.log('res.data attendance')
        console.log(res.data)
        this.workersdata = res.data;
        this.dataSource.data = this.workersdata.map((worker) => {
          if (worker?.attendance != null) {
            worker['total_hours'] = worker.attendance.total_hours;
          } else {
            worker['total_hours'] = 0
          }
          return worker
        })
      })
    })
  }
  getTodayDate() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0'); // Ensure day has leading zero if needed
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure month has leading zero if needed
    var year = today.getFullYear();
    return day + '-' + month + '-' + year;
  }
  handleUpdateDate(date: Date) {
    this.selectedDate = date;
    this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
      console.log(res.data)
      this.workersdata = res.data;
      this.dataSource.data = this.workersdata.map((worker) => {
        if (worker?.attendance != null) {
          worker['total_hours'] = worker.attendance.total_hours;
        } else {
          worker['total_hours'] = 0
        }
        return worker
      })
    })
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  fetchData() {
    this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
      console.log(res.data)
      this.workersdata = res.data;
      this.dataSource.data = this.workersdata.map((worker) => {
        if (worker?.attendance != null) {
          worker['total_hours'] = worker.attendance.total_hours;
        } else {
          worker['total_hours'] = 0
        }
        return worker
      })
    })
  }

  clickAttendance(worker, date) {
    const activeModal = this.modalService.open(EnterAttendanceModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.worker = worker
    activeModal.componentInstance.date = date
    activeModal.componentInstance.fetchData = this.fetchData.bind(this)
  }

  clickAssignedTask(worker, date) {
    const activeModal = this.modalService.open(EnterTimeAssignedTaskModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
    });
    activeModal.componentInstance.worker = worker
    activeModal.componentInstance.date = date
    activeModal.componentInstance.fetchData = this.fetchData.bind(this)
  }

}
