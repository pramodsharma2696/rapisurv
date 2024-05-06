import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
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
  start_date
  end_date
  dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [];

  constructor(
    private timesheetService: TimesheetService

  ) { }

  ngOnInit(): void {
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
    })
    this.getCurrentMonthDates()
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
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

  getCurrentMonthDates() {
    // Get the current date
    const currentDate = new Date();

    // Get the first day of the month
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

    // Get the last day of the month
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

    // Function to format date as "dd-mm-yyyy"
    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    // Format start and end dates
    const formattedStartDate = formatDate(firstDayOfMonth);
    const formattedEndDate = formatDate(lastDayOfMonth);

    // Return the start and end dates
    this.start_date = formattedStartDate
    this.end_date = formattedEndDate
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

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
