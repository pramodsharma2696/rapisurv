import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Input() timesheetid;
  @Input() timesheet;
  constructor() { }

  ngOnInit(): void {
  }

}
