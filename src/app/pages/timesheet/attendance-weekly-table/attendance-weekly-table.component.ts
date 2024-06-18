import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { AngularCsv } from 'angular-csv-ext/dist/Angular-csv';

@Component({
  selector: 'app-attendance-weekly-table',
  templateUrl: './attendance-weekly-table.component.html',
  styleUrls: ['./attendance-weekly-table.component.scss']
})
export class AttendanceWeeklyTableComponent implements OnInit {
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
    this.getCurrentWeekDates()
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

  getCurrentWeekDates() {
    const currentDate = new Date();
    const currentDayOfWeek = currentDate.getDay();

    const diffFromStartOfWeek = currentDayOfWeek === 0 ? 0 : currentDayOfWeek - 1;

    const startDate = new Date(currentDate);
    startDate.setDate(currentDate.getDate() - diffFromStartOfWeek);

    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);

    function formatDate(date) {
      const day = date.getDate().toString().padStart(2, '0');
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    const formattedStartDate = formatDate(startDate);
    const formattedEndDate = formatDate(endDate);

    // Return the start and end dates
    this.start_date = formattedStartDate
    this.end_date = formattedEndDate
    // return {
    //   startDate: formattedStartDate,
    //   endDate: formattedEndDate
    // };
  }


  fetchData() {
    this.displayedColumns = ['worker_id', 'first_name', 'last_name', ...this.getDatesInRange(this.start_date, this.end_date)]
    this.timesheetService.getAllWorkerAttendacedata(this.timesheetdata.timesheet_id, this.start_date, this.end_date).subscribe(res => {
      let data = res.data.map((item) => {
        return {
          ...item.worker, attendance: item.attendance
        }
      })
      this.dataSource.data = data
      this.workers = data
    })
  }

  setStartAndEndData(start_date, end_date) {
    this.start_date = start_date;
    this.end_date = end_date
  }

  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  exportEsv() {
    let headers = ['Worker id', 'First Name', 'Last Name', ...this.displayedColumns.slice(3)]
    let requiredData = this.dataSource.data.map((worker) => {
      let data = {
        worker_id: worker['worker_id'],
        first_name: worker['first_name'],
        last_name: worker['last_name'],
      }
      for (let ind in worker['attendance']) {
        if (worker['attendance'][ind]['id'] != null) {
          data[this.displayedColumns[parseInt(ind) + 3]] = `${worker['attendance'][ind]?.first_in_time} - ${worker['attendance'][ind]?.last_out_time}`
        } else {
          data[this.displayedColumns[parseInt(ind) + 3]] = '-'
        }
      }
      return data
    })

    new AngularCsv(requiredData, 'Attendance', { headers: headers })
  }
}
