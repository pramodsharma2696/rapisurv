import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Input() timesheetid
  numberofweeks;
  selectedWeek;
  selectedDay;
  selectedYear;
  timesheetdata;
  weeksoption = []
  selectedWeekInput
  years: number[];

  ngOnInit(): void {
    // getWorkingDays
    // this.timesheetService.getWorkingDays('2024-04-27', '2024-06-23').subscribe(res => {
    //   console.log("Working days")
    //   console.log(res)
    // })
    this.selectedWeek = this.getCurrentWeek();
    this.selectedDay = this.getTodayDate();
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear
    this.years = Array.from({ length: 5 }, (_, i) => currentYear + i);
    console.log("week day id" + this.timesheetid)

    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
    })
    this.weeksoption = this.getWeekNumbersArray()
    this.selectedWeekInput = this.getCurrentWeekNumber()


  }

  getWeekNumbersArray() {
    const weeksArray = [];

    // Push week numbers from 1 to 52 into the array
    for (let i = 1; i <= 52; i++) {
      weeksArray.push(i);
    }

    return weeksArray;
  }

  getCurrentWeekNumber() {
    const now = new Date();
    const januaryFirst = new Date(now.getFullYear(), 0, 1);
    const millisecondsInWeek = 7 * 24 * 60 * 60 * 1000;

    // Calculate the difference in milliseconds between now and January 1st
    const difference = now.getTime() - januaryFirst.getTime();

    // Calculate the current week number
    const weekNumber = Math.ceil(difference / millisecondsInWeek);
    console.log("Week number>>" + weekNumber);
    return `Week ${weekNumber}`;
  }

  getCurrentWeek() {
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const today = new Date();
    const dayIndex = today.getDay(); // 0 for Sunday, 1 for Monday, etc.
    const currentDate = today.getDate();
    const currentMonth = today.getMonth() + 1;
    const currentYear = today.getFullYear();
    const currentWeek = [];

    // Calculate the starting date of the current week (Monday)
    const startOfWeek = new Date(currentYear, currentMonth - 1, currentDate - dayIndex + (dayIndex === 0 ? -6 : 1));

    // Iterate through the days of the week and construct the array
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i);
      const dayOfWeek = daysOfWeek[date.getDay()];
      const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`;
      currentWeek.push({ day: dayOfWeek, date: formattedDate });
    }

    console.log(currentWeek);
    return currentWeek;
  }

  getTodayDate() {
    var today = new Date();
    var day = String(today.getDate()).padStart(2, '0'); // Ensure day has leading zero if needed
    var month = String(today.getMonth() + 1).padStart(2, '0'); // Ensure month has leading zero if needed
    var year = today.getFullYear();
    return day + '-' + month + '-' + year;
  }
  getDatesOfWeek(weekNumber: number, year: number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const januaryFirst = new Date(year, 0, 1);
    const firstMondayOffset = (1 - januaryFirst.getDay() + 7) % 7; // Offset to the first Monday
    const firstMonday = new Date(januaryFirst.getFullYear(), 0, 1 + firstMondayOffset);

    // Calculate the start date of the week (Monday)
    const startDate = new Date(firstMonday.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);
    console.log(startDate);

    const datesOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      datesOfWeek.push({ day: dayOfWeek, date: formattedDate });
    }

    return datesOfWeek;
  }

  onSelectWeek() {
    console.log(this.selectedWeekInput)
    let data = this.getDatesOfWeek(this.selectedWeekInput, 2024);
    this.selectedWeek = data
    console.log(data)
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

  getWeekInfo(date: Date) {
    date = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    date.setUTCDate(date.getUTCDate() + 4 - (date.getUTCDay() || 7));
    // Get first day of year
    const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    const weekNumber = Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    // Calculate last week number in the year
    const lastWeekOfYear = Math.ceil((((new Date(Date.UTC(date.getUTCFullYear(), 11, 31)).getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    // Return week info
    return {
      currentWeekNumber: weekNumber,
      lastWeekOfYear: lastWeekOfYear
    };
  }
}
