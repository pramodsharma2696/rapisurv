import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NbToastrService } from '@nebular/theme';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

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
  @Input() timesheetid;
  @Input() timesheet;
  timesheetdata;
  workersdata;

  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['worker_id', 'first_name', 'last_name', 'total_hours', 'action'];
  selectedDate;


  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    private toastrService: NbToastrService

  ) { }

  ngOnInit(): void {
    this.selectedDate = '27-04-2024';
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
        console.log(res.data)
        this.workersdata = res.data;
        this.dataSource.data = this.workersdata.map((worker) => {
          if (worker?.attendance != null) {
            worker['total_hours'] = worker.attendance.total_hours;
            worker['approve'] = worker.attendance.approve
          } else {
            worker['total_hours'] = 0
          }
          return worker
        })
      })
    })
    // Initialize your dataSource with actual data here
    // this.dataSource.data = [
    //   { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
    //   { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
    //   { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
    //   { workerId: 1, firstName: 'John', lastName: 'Doe', hours: 40 },
    //   // Add more workers as needed
    // ];


  }

  approveWorkerAttendance(worker) {
    console.log(worker)
    let attendance_id = worker?.attendance.id
    this.timesheetService.approveWorkerAttendance(attendance_id).subscribe(res => {
      console.log(res?.data)
      if (res.type == 'success') {
        worker['approve'] = '1'
      }
    })
  }

  rejectWorkerAttendance(worker) {
    console.log(worker)
    let attendance_id = worker?.attendance.id
    this.timesheetService.rejectWorkerAttendance(attendance_id).subscribe(res => {
      console.log(res?.data)
      if (res.type == 'success') {
        worker['approve'] = '0'
      }
    })
  }

  approveAllWorkerAttendance() {
    console.log("Approve all")
    let timesheet_id = this.timesheetdata.timesheet_id
    let date = this.selectedDate
    this.timesheetService.approveAllWorkerAttendance(timesheet_id, date).subscribe(res => {
      console.log(res?.data)
      if (res.type == 'success') {
        this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
          console.log(res.data)
          this.workersdata = res.data;
          this.dataSource.data = this.workersdata.map((worker) => {
            if (worker?.attendance != null) {
              worker['total_hours'] = worker.attendance.total_hours;
              worker['approve'] = worker.attendance.approve
            } else {
              worker['total_hours'] = 0
            }
            return worker
          })
        })
        this.toastrService.success('All worker attendace approved!.', 'Success', {
          duration: 3000,
        });
      }
    },
      err => {
        this.toastrService.warning('All worker attendace approved!.', 'Something went worng. Please try again!', {
          duration: 3000,
        });
      }
    )
  }

  rejectAllWorkerAttendance() {
    console.log("reject all")
    let timesheet_id = this.timesheetdata.timesheet_id
    let date = this.selectedDate
    this.timesheetService.rejectAllWorkerAttendance(timesheet_id, date).subscribe(res => {
      console.log(res?.data)
      if (res.type == 'success') {
        this.timesheetService.getLocalWorkerAttendanceByDate(this.timesheetdata.timesheet_id, this.selectedDate).subscribe(res => {
          console.log(res.data)
          this.workersdata = res.data;
          this.dataSource.data = this.workersdata.map((worker) => {
            if (worker?.attendance != null) {
              worker['total_hours'] = worker.attendance.total_hours;
              worker['approve'] = worker.attendance.approve
            } else {
              worker['total_hours'] = 0
            }
            return worker
          })
        })
        this.toastrService.success('All worker attendace rejected!', 'Success', {
          duration: 3000,
        });
      }
    },
      err => {
        this.toastrService.warning('All worker attendace approved!.', 'Something went worng. Please try again!', {
          duration: 3000,
        });
      })
  }
}
