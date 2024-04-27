import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-enter-attendance-modal',
  templateUrl: './enter-attendance-modal.component.html',
  styleUrls: ['./enter-attendance-modal.component.scss']
})
export class EnterAttendanceModalComponent implements OnInit {

  @Input() worker;

  in_time_1;
  out_time_1;
  in_time_2;
  out_time_2;
  in_time_3;
  out_time_3;

  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
    console.log(this.worker)
  }

  convertTo12HourFormat(time24) {
    const [hours, minutes] = time24.split(':').map(Number);

    const time = new Date();
    time.setHours(hours);
    time.setMinutes(minutes);

    const formattedTime = time.toLocaleString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    });

    return formattedTime.toLocaleLowerCase()
  }

  submitAttendance() {
    console.log(this.in_time_1)
    console.log(this.convertTo12HourFormat(this.in_time_1))
    console.log(this.out_time_1)
    console.log(this.in_time_2)
    console.log(this.out_time_2)
    console.log(this.in_time_3)
    console.log(this.out_time_3)

    let attendanceData = {
      worker_id: this.worker.id,
      timesheet_id: this.worker.timesheet_id,
      date: '27-04-2024',
      in_time1: this.in_time_1 ? this.convertTo12HourFormat(this.in_time_1) : null,
      out_time1: this.out_time_1 ? this.convertTo12HourFormat(this.out_time_1) : null,
      in_time2: this.in_time_2 ? this.convertTo12HourFormat(this.in_time_2) : null,
      out_time2: this.out_time_2 ? this.convertTo12HourFormat(this.out_time_2) : null,
      in_time3: this.in_time_3 ? this.convertTo12HourFormat(this.in_time_3) : null,
      out_time3: this.out_time_3 ? this.convertTo12HourFormat(this.out_time_3) : null
      //attendance_id:2
    }

    console.log(attendanceData)

    this.timesheetService.createWorkerAttendance(attendanceData).subscribe(res => {
      console.log(res.data)
    })
  }
}
