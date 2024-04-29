import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-week-days-select',
  templateUrl: './week-days-select.component.html',
  styleUrls: ['./week-days-select.component.scss']
})
export class WeekDaysSelectComponent implements OnInit {

  constructor(
    private timesheetService: TimesheetService
  ) { }

  @Output() updateDate = new EventEmitter<any>();


  selectedWeek;
  selectedDay;
  ngOnInit(): void {
    // getWorkingDays
    this.timesheetService.getWorkingDays('2024-04-27', '2024-06-23').subscribe(res => {
      console.log("Working days")
      console.log(res)
    })
    this.selectedWeek = this.getCurrentWeek();

    this.selectedDay = this.getTodayDate();
    // this.updateParentDate(this.selectedDay)
    console.log(">>>>>>>>" + this.selectedDay)
  }

  getCurrentWeek() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date();
    const dayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentWeek = [];

    // Calculate the starting date of the current week (Sunday)
    const startOfWeek = new Date(currentYear, currentMonth - 1, currentDate - dayIndex);

    // Iterate through the days of the week and construct the array
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      currentWeek.push({ day: dayOfWeek, date: formattedDate });
    }

    console.log(currentWeek)
    return currentWeek;
  }

  getTodayDate() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0'); // Ensure day has leading zero if needed
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure month has leading zero if needed
    var year = today.getFullYear();
    return day + '-' + month + '-' + year;
  }

  formatDateToDayMonth(date) {
    var parts = date.split('-');
    var formattedDate = new Date(parts[2], parts[1] - 1, parts[0]);
    var day = formattedDate.getDate();
    var month = formattedDate.toLocaleDateString('en-US', { month: 'short' });
    var suffix = this.getDaySuffix(day);
    var formattedDateString = day + suffix + ' ' + month;
    return formattedDateString;
  }


  getDaySuffix(day) {
    if (day >= 11 && day <= 13) {
      return 'th';
    }
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }

  selectDate(date) {
    this.selectedDay = date;
    this.updateParentDate(date)
    console.log(this.selectedDay)
  }

  updateParentDate(date: Date) {
    this.updateDate.emit(date);
  }
}
