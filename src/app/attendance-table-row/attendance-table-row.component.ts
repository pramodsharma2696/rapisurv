import { Component, Input, OnInit } from '@angular/core';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-attendance-table-row',
  templateUrl: './attendance-table-row.component.html',
  styleUrls: ['./attendance-table-row.component.scss']
})
export class AttendanceTableRowComponent implements OnInit {
  @Input() worker: any;
  @Input() start_date: any;
  @Input() end_date: any;

  constructor(
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    console.log("table row")
    console.log(this.start_date)
    console.log(this.end_date)
    this.timesheetService.getAttendaceById(this.worker.timesheet_id, this.worker.id, this.start_date, this.end_date).subscribe(res => {
      this.worker.attendance = res.data
      console.log(this.worker)
    })

  }

}
