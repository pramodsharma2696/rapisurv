import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TimesheetService } from 'src/app/shared/services/public-api';



@Component({
  selector: 'app-attendance-monthly-table',
  templateUrl: './attendance-monthly-table.component.html',
  styleUrls: ['./attendance-monthly-table.component.scss']
})
export class AttendanceMonthlyTableComponent implements OnInit {
  @Input() timesheetid;
  timesheetdata;
  workers;
  start_date = '01-04-2024'
  end_date = '30-04-2024'
  // dataSource = new MatTableDataSource<any>();
  displayedColumns: string[] = ['Id', 'First Name', 'Last Name',];

  constructor(
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {

    this.displayedColumns = [...this.displayedColumns, ...this.getDatesInRange(this.start_date, this.end_date)]

    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      // let id = res?.data.timesheet_id
      // this.timesheetService.getAllWorkerAttendance(id, this.start_date, this.end_date).subscribe(res => {
      //   // this.workers = res?.data;
      //   // this.dataSource.data = this.workers
      //   let data = res.map((item) => {
      //     return {
      //       ...item.worker, attendance: item.attendance.data.attendances
      //     }
      //   })
      //   console.log("Attendance ")
      //   console.log(data)
      //   // this.dataSource.data = data
      //   this.workers = data
      // })

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
    this.timesheetService.getAllWorkerAttendance(this.timesheetdata.timesheet_id, this.start_date, this.end_date).subscribe(res => {
      // this.workers = res?.data;
      // this.dataSource.data = this.workers
      let data = res.map((item) => {
        return {
          ...item.worker, attendance: item.attendance.data.attendances
        }
      })
      console.log("Attendance ")
      console.log(data)
      // this.dataSource.data = data
      this.workers = data
    })
  }


}
