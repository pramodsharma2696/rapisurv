import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { EnterAttendanceModalComponent } from '../enter-attendance-modal/enter-attendance-modal.component';
import { EnterTimeAssignedTaskModalComponent } from '../enter-time-assigned-task-modal/enter-time-assigned-task-modal.component';
import { MatPaginator } from '@angular/material/paginator';
import { EnterMyTimeCalendarComponent } from '../enter-my-time-calendar/enter-my-time-calendar.component';
import { NbToastrService } from '@nebular/theme';

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

  isassign_task = false
  buttonName = ''
  @ViewChild('calendarcomp') calendarcomp: EnterMyTimeCalendarComponent;

  dataSource = new MatTableDataSource<Worker>();
  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'attendance', 'assigned_task', 'total_hours'];;
  selectedDate;

  calculate_hours: boolean = false
  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    private toastrService: NbToastrService

  ) { }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.selectedDate = this.getTodayDate();
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      this.calculate_hours = this.timesheetdata.hours == '1';
      console.log("Enter Time ts dat")
      console.log(this.timesheetdata)
      this.isassign_task = this.timesheetdata.assign_task == '1'
      if (this.timesheetdata.assign_task == '1' && this.calculate_hours) {
        this.buttonName = 'Distribute Hours'
      } else {
        this.buttonName = 'Enter Hours'

      }
      this.displayedColumns = ['worker_id', 'first_name', 'last_name', 'attendance', 'assigned_task', 'total_hours'];


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
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      this.calculate_hours = this.timesheetdata.hours == '1';
      this.isassign_task = this.timesheetdata.assign_task == '1'
      if (this.timesheetdata.assign_task == '1') {
        this.buttonName = 'Distribute Hours'
      } else {
        this.buttonName = 'Enter Hours'

      }
    })
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
    console.log(this.timesheetdata)
    if (this.timesheetdata.status == '1') {
      if (worker.status == "active") {
        const activeModal = this.modalService.open(EnterAttendanceModalComponent, {
          size: 'md',
          container: 'nb-layout',
          centered: true,
        });
        activeModal.componentInstance.worker = worker
        activeModal.componentInstance.date = date
        activeModal.componentInstance.fetchData = this.fetchData.bind(this)
      } else {
        this.toastrService.warning('Worker is inactive.', 'Warning', {
          duration: 3000,
        });
      }
    } else {
      this.toastrService.warning('Timesheet is closed.', 'Warning', {
        duration: 3000,
      });
    }

  }

  clickAssignedTask(worker, date) {
    console.log(worker)
    if (this.timesheetdata.status == '1') {

      if (worker.status == "active") {

        const activeModal = this.modalService.open(EnterTimeAssignedTaskModalComponent, {
          size: 'md',
          container: 'nb-layout',
          centered: true,
        });
        activeModal.componentInstance.worker = worker
        activeModal.componentInstance.date = date
        activeModal.componentInstance.timesheetid = this.timesheetid
        activeModal.componentInstance.fetchData = this.fetchData.bind(this)
      } else {
        this.toastrService.warning('Worker is inactive.', 'Warning', {
          duration: 3000,
        });
      }
    } else {
      this.toastrService.warning('Timesheet is closed.', 'Warning', {
        duration: 3000,
      });
    }
  }

  showCalendarData(row) {
    console.log(row)
    this.calendarcomp.showWorkerData(row)
  }
}
