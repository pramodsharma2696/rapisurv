import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AttendanceWeeklyTableComponent } from '../attendance-weekly-table/attendance-weekly-table.component';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AttendanceMonthlyTableComponent } from '../attendance-monthly-table/attendance-monthly-table.component';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {
  @Input() timesheetid;
  @Input() timesheet;
  selectedTab
  @ViewChild(AttendanceWeeklyTableComponent) attendanceWeeklyTableComponent: AttendanceWeeklyTableComponent;
  @ViewChild(AttendanceMonthlyTableComponent) attendanceMonthlyTableComponent: AttendanceMonthlyTableComponent;
  selectedWeek;
  selectedYear;
  years: number[];
  weeksoption = []
  selectedWeekInput

  constructor() {

  }

  ngOnInit(): void {
    this.selectedWeek = this.getCurrentWeek();
    const currentYear = new Date().getFullYear();
    this.selectedYear = currentYear
    this.years = Array.from({ length: 5 }, (_, i) => currentYear + i);
    this.weeksoption = this.getWeekNumbersArray()
    this.selectedWeekInput = this.getCurrentWeekNumber()
    this.selectedTab = 'Month'
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

  onSelectWeek() {
    console.log(this.selectedWeekInput)
    let data = this.getDatesOfWeek(this.selectedWeekInput, 2024);
    this.selectedWeek = data
    this.attendanceWeeklyTableComponent.setStartAndEndData(this.selectedWeek[0]['date'], this.selectedWeek[6]['date'])
    this.attendanceWeeklyTableComponent.fetchData()

    console.log(data)
  }

  getDatesOfWeek(weekNumber: number, year: number) {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const januaryFirst = new Date(year, 0, 1);
    const firstMondayOffset = (1 - januaryFirst.getDay() + 7) % 7; // Offset to the first Monday
    const firstMonday = new Date(januaryFirst.getFullYear(), 0, 1 + firstMondayOffset);

    // Calculate the start date of the week (Monday)
    const startDate = new Date(firstMonday.getTime() + (weekNumber - 1) * 7 * 24 * 60 * 60 * 1000);

    const datesOfWeek = [];

    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
      const formattedDate = `${String(currentDate.getDate()).padStart(2, '0')}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${currentDate.getFullYear()}`;
      const dayOfWeek = daysOfWeek[currentDate.getDay()];
      datesOfWeek.push({ day: dayOfWeek, date: formattedDate });
    }

    return datesOfWeek;
  }

  fetchMonthly() {
    this.attendanceMonthlyTableComponent.fetchData()
  }

  fetchWeekly() {
    this.attendanceWeeklyTableComponent.fetchData()
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // Fetch data when the tab is changed
    if (tabChangeEvent.index === 0) {
      // Code to fetch monthly data
      this.fetchMonthly()
      this.selectedTab = 'Month'

    } else if (tabChangeEvent.index === 1) {
      // Code to fetch weekly data
      this.fetchWeekly()
      this.selectedTab = 'Week'

    }
  }

  applyFilter(event: any) {
    this.attendanceMonthlyTableComponent.applyFilter(event)
    this.attendanceWeeklyTableComponent.applyFilter(event)
  }

  onClickExportCSV() {
    if (this.selectedTab == 'Month') {
      this.attendanceMonthlyTableComponent.exportEsv()
    } else {
      this.attendanceWeeklyTableComponent.exportEsv()
    }
  }
}
