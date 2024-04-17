import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, TimesheetService } from 'src/app/shared/services/public-api';


@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],

})
export class CreateTimesheetComponent implements OnInit {

  projectId;
  projectDetails = null;
  projectDesciption = null
  constructor(
    private route: ActivatedRoute,
    private timesheetService: TimesheetService
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
  }

}
