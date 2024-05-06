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

  constructor() { }

  ngOnInit(): void {
    this.selectedTab = 'Month'
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
