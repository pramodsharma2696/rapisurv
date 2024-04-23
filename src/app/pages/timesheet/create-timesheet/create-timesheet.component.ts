import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, TimesheetService } from 'src/app/shared/services/public-api';


@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],

})
export class CreateTimesheetComponent implements OnInit {

  timesheetform: FormGroup

  projectId;
  projectDetails = null;
  start_date;
  end_date;
  status;
  localwork;
  scanning;
  hours;
  break;
  break_duration;
  break_duration_type;
  assign_admin

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    console.log("create timeshett")
  }

  ngOnInit(): void {
    console.log(
      "Timesheet"
    )
    let id;
    this.route.params.subscribe(params => {
      this.projectId = params['id'];
    });
    console.log(this.projectId)
    this.timesheetService.getProjectById(this.projectId).subscribe(res => {
      this.projectDetails = res.data
      console.log("ress>>")
      console.log(res.data)
    })

    this.projectService.loadAllTeams().subscribe(res => {
      console.log("ress team>>")
      console.log(res.data)
    })

    this.timesheetform = this.fb.group({
      start_date: [''],
      end_date: [''],
      status: [''],
      localwork: [''],
      scanning: [''],
      hours: [''],
      break: [''],
      break_duration: [''],
      break_duration_type: [''],
      assign_admin: ['']
    })
  }


  onFormSubmit() {
    console.log(this.timesheetform.value)

    let timesheetData = {
      projectid: this.projectId,
      start_date: this.timesheetform.value.start_date,
      end_date: this.timesheetform.value.end_date,
      status: this.timesheetform.value.status ? '1' : '0',
      localwork: this.timesheetform.value.localwork ? '1' : '0',
      scanning: this.timesheetform.value.scanning ? '1' : '0',
      hours: this.timesheetform.value.hours ? '1' : '0',
      break: this.timesheetform.value.break ? '1' : '0',
      break_duration: this.timesheetform.value.break_duration,
      break_duration_type: this.timesheetform.value.break_duration_type,
      assign_admin: '1,2,3',
      project: this.projectDetails
    }
    this.timesheetService.createTimesheet(timesheetData).subscribe(res => {
      console.log(res)
      if (res.type == 'success') {
        this.router.navigate([`/app/timesheet`]);

      }
    })
    console.log(timesheetData)
  }
}
