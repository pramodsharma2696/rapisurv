import { Component, Input, OnInit } from '@angular/core';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-enter-attendance-modal',
  templateUrl: './enter-attendance-modal.component.html',
  styleUrls: ['./enter-attendance-modal.component.scss']
})
export class EnterAttendanceModalComponent implements OnInit {

  @Input() worker;
  @Input() fetchData;
  @Input() date;
  in_time_1;
  out_time_1;
  in_time_2;
  out_time_2;
  in_time_3;
  out_time_3;
  is_approved = false
  attendance_id;

  constructor(
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    console.log(this.worker);
    if (this.worker.attendance != null) {
      this.attendance_id = this.worker.attendance.id
      this.is_approved = this.worker.attendance.approve == '1';
      console.log(this.is_approved)
      let attendance = JSON.parse(this.worker.attendance.attendance)
      attendance.forEach((item, index) => {
        this[`in_time_${index + 1}`] = this.convertToHHMM(item.in_time);
        this[`out_time_${index + 1}`] = this.convertToHHMM(item.out_time);
      });
    } else {
      this.attendance_id = null
    }
  }

  convertToHHMM(time) {
    const [hours, minutes, period] = time.split(/[:\s]+/);
    let hour = parseInt(hours);
    if (period.toLowerCase() === 'pm' && hour !== 12) {
      hour += 12;
    } else if (period.toLowerCase() === 'am' && hour === 12) {
      hour = 0;
    }
    return `${String(hour).padStart(2, '0')}:${minutes}`;
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
    if (this.is_approved) {
      this.toastrService.warning("Attendance is approved. You can't change the time.", 'Warning', {
        duration: 3000,
      });
    } else {
      let attendanceData = {
        worker_id: this.worker.id,
        timesheet_id: this.worker.timesheet_id,
        date: this.date,
        in_time1: this.in_time_1 ? this.convertTo12HourFormat(this.in_time_1) : null,
        out_time1: this.out_time_1 ? this.convertTo12HourFormat(this.out_time_1) : null,
        in_time2: this.in_time_2 ? this.convertTo12HourFormat(this.in_time_2) : null,
        out_time2: this.out_time_2 ? this.convertTo12HourFormat(this.out_time_2) : null,
        in_time3: this.in_time_3 ? this.convertTo12HourFormat(this.in_time_3) : null,
        out_time3: this.out_time_3 ? this.convertTo12HourFormat(this.out_time_3) : null
      }

      console.log(attendanceData)
      console.log(this.worker)
      if (this.attendance_id != null) {
        attendanceData['attendance_id'] = this.attendance_id
      }
      this.timesheetService.createWorkerAttendance(attendanceData).subscribe(res => {
        console.log(res.data)
        if (res.type == 'success') {
          this.fetchData()
          this.toastrService.success('Worker attendance updated!', 'Success', {
            duration: 3000,
          });
        }
        this.activeModal.close({});

      }, error => {
        console.error('An error occurred:', error);
        this.toastrService.warning(error.error.message, 'Error', {
          duration: 3000,
        });
      })
    }
  }
}
