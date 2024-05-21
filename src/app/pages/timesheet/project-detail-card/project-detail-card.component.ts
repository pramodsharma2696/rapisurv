import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-project-detail-card',
  templateUrl: './project-detail-card.component.html',
  styleUrls: ['./project-detail-card.component.scss'],
})
export class ProjectDetailCardComponent implements OnInit {
  @Input() timesheetdata;
  project;
  total_workers

  constructor(
    private router: Router,
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    console.log(this.timesheetdata)
    let projectId = this.timesheetdata.project_id
    this.timesheetService.getProjectById(projectId).subscribe(res => {
      console.log("Projects ----->")
      console.log(res.data)
      this.project = res.data
    })

    this.timesheetService.getNumberOfWorkerByTimesheetId(this.timesheetdata.timesheet_id).subscribe(res => {
      console.log("no of workers ----->")
      console.log(res.data)
      this.total_workers = res.data.total_workers
    })

  }
  formatDate(dateA: string): string {
    if(dateA == null){
      return ''
    }
    let date = new Date(dateA)
    const day: number = date.getDate();
    const month: string = date.toLocaleString('en-us', { month: 'short' });
    const year: number = date.getFullYear();

    const suffix: string = this.getDaySuffix(day);

    return `${day}${suffix} ${month} ${year}`;
  }

  getDaySuffix(day: number): string {
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
  }

  clickProject() {
    this.router.navigate(['/app/timesheet', this.timesheetdata.id]);
  }
}
