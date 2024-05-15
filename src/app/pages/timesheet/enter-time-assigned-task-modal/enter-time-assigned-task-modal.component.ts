import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-enter-time-assigned-task-modal',
  templateUrl: './enter-time-assigned-task-modal.component.html',
  styleUrls: ['./enter-time-assigned-task-modal.component.scss']
})
export class EnterTimeAssignedTaskModalComponent implements OnInit {


  @Input() worker;
  @Input() date;
  @Input() fetchData;
  work_assigned;
  taskForm: FormGroup;
  work_assigned_data;
  total_hours_input;
  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private modalService: NgbModal,
    private toastrService: NbToastrService,
    private activeModal: NgbActiveModal,

  ) { }

  ngOnInit(): void {
    console.log('this.worker enetr tijkj')
    console.log(this.worker)
    console.log(this.date)
    console.log(this.worker.work_assignment)
    // console.log(typeof this.worker.attendance.assigned_task_hours)
    if (this.worker.attendance != null && this.worker.attendance.assigned_task_hours != null) {
      this.work_assigned_data = JSON.parse(this.worker.attendance.assigned_task_hours)
    }
    if (this.worker.work_assignment != null) {
      this.work_assigned = JSON.parse(this.worker.work_assignment)
      console.log(this.work_assigned)
    } else {
      this.work_assigned = []
    }

    this.taskForm = this.fb.group({});
    this.buildForm();
    this.work_assigned.forEach(task => {
      const initialValue = this.work_assigned_data != null && this.work_assigned_data[task.toLowerCase()] ? this.work_assigned_data[task.toLowerCase()] : 0;
      console.log("initialValue       " + initialValue)
      console.log(this.work_assigned_data)
      this.taskForm.addControl(task.toLowerCase(), new FormControl(initialValue));
    });
  }

  buildForm() {

  }

  onSubmit() {
    console.log(this.taskForm.value);
    // You can handle form submission logic here
    let assignedtaskhourData = {
      worker_id: this.worker.id,
      timesheet_id: this.worker.timesheet_id,
      date: this.date,
      assign_task_hours: this.taskForm.value
    }


    this.timesheetService.createWorkerAssignTaskHour(assignedtaskhourData).subscribe(res => {
      console.log(res.data)
      if (res.type == 'success') {
        this.fetchData()
        this.toastrService.success('Worker hours updated!', 'Success', {
          duration: 3000,
        });
      }
      this.activeModal.close({});

    })
  }

  convertDateFormat(dateString) {
    var parts = dateString.split("-");
    // Note: parts[0] is the day, parts[1] is the month, and parts[2] is the year
    return parts[2] + "-" + parts[1] + "-" + parts[0];
  }

  submitTotalHours() {
    if (this.total_hours_input != undefined) {
      this.timesheetService.addAttendanceTotalHours(this.worker.timesheet_id, this.worker.id, this.date, this.total_hours_input).subscribe(res => {
        console.log(res.data)
        if (res.type == 'success') {
          this.fetchData()
          this.toastrService.success('Worker hours updated!', 'Success', {
            duration: 3000,
          });
        }
        this.activeModal.close({});

      }, error => {
        console.error('An error occurred:', error);
        this.toastrService.warning('Unable to add work hours', 'Error', {
          duration: 3000,
        });
        this.activeModal.close({});

      })

    } else {
      this.toastrService.warning('Enter total hours.', 'Warning', {
        duration: 3000,
      })
    }

    console.log(this.total_hours_input)
  }

}
