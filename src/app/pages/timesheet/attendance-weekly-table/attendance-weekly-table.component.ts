import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-attendance-weekly-table',
  templateUrl: './attendance-weekly-table.component.html',
  styleUrls: ['./attendance-weekly-table.component.scss']
})
export class AttendanceWeeklyTableComponent implements OnInit {
  @Input() timesheetid;
  timesheetdata;
  workers;
  start_date = '06-05-2024'
  end_date = '08-05-2024'
  dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = [];
  constructor(
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      
    })
  }

  getDatesInRange(startDateStr, endDateStr) {
    let startDateParts = startDateStr.split('-');
    let endDateParts = endDateStr.split('-');

    let startDate = new Date(startDateParts[2], startDateParts[1] - 1, startDateParts[0]); // Month is 0-indexed
    let endDate = new Date(endDateParts[2], endDateParts[1] - 1, endDateParts[0]); // Month is 0-indexed

    let datesArray = [];
    let currentDate = startDate;
    while (currentDate <= endDate) {
      // Format the date as needed
      let formattedDate = currentDate.toLocaleDateString('en-GB'); // Format as DD-MM-YYYY
      datesArray.push(formattedDate);

      // Move to the next day
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return datesArray;
  }

  fetchData() {
    this.displayedColumns = ['worker_id', 'first_name', 'last_name', ...this.getDatesInRange(this.start_date, this.end_date)]
    console.log(this.displayedColumns)

    this.timesheetService.getAllWorkerAttendance(this.timesheetdata.timesheet_id, this.start_date, this.end_date).subscribe(res => {
      
      let data = res.map((item) => {
        return {
          ...item.worker, attendance: item.attendance.data.attendances
        }
      })
      this.dataSource.data = data
      this.workers = data
    })
  }

}
