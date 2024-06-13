import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Calendar, CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-enter-my-time-calendar',
  templateUrl: './enter-my-time-calendar.component.html',
  styleUrls: ['./enter-my-time-calendar.component.scss']
})
export class EnterMyTimeCalendarComponent implements OnInit, AfterViewInit {

  @ViewChild('calendar') calendarComponent: FullCalendarComponent;
  @Input() timesheetid;
  @Input() workerid;
  month;
  year;
  worker;
  timesheetdata;

  showCalendar = false;
  workerdataMonthy;
  weeklyHours = [0, 0, 0, 0, 0]

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    events: [],
    plugins: [dayGridPlugin],
    eventColor: 'transparent',
    eventTextColor: 'black',
    firstDay: 1
  };



  constructor(private timesheetService: TimesheetService,) {
    this.getCurrentYearAndMonth()
  }

  ngOnInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [],
      plugins: [dayGridPlugin],
      eventColor: 'transparent',
      eventTextColor: 'black',
      firstDay: 1
    };
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      setTimeout(() => {
        this.showCalendar = true
      }, 3000);
    })
  }

  ngAfterViewInit(): void {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [],
      plugins: [dayGridPlugin],
      eventColor: 'transparent',
      eventTextColor: 'black',
      firstDay: 1
    };
  }

  getCurrentYearAndMonth() {
    const months = ["january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"];
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const monthIndex = currentDate.getMonth();
    const month = months[monthIndex];
    this.month = month
    this.year = year
    return { year, month };
  }

  initCalendaer() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      events: [],
      plugins: [dayGridPlugin],
      eventColor: 'transparent',
      eventTextColor: 'black',
      firstDay: 1
    };
  }

  showWorkerData(worker) {
    this.timesheetService.getWorkerCalendarDataByMonth(worker.id, this.timesheetdata.timesheet_id, this.month, this.year).subscribe(res => {
      this.worker = worker
      this.weeklyHours = Object.values(res.data.weekly_working_hours)
      console.log("Calendar data")
      console.log(res.data)
      this.workerdataMonthy = res.data
      let event = this.convertDataToEvents(res.data)
      // let 
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        events: event,
        plugins: [dayGridPlugin],
        eventColor: 'transparent',
        eventTextColor: 'black',
        // height: '100%',
        firstDay: 1
      };
    })
  }
  showCal() {
    this.showCalendar = true
  }

  convertDataToEvents(data) {
    let events = Object.keys(data.daily_working_hours).map((date) => {
      const hours = data.daily_working_hours[date];
      let status = data.approve_status[date];
      const dayOfWeek = new Date(date).getDay();
      status = (dayOfWeek === 0 || dayOfWeek === 6) ? -1 : status
      let color;
      if (status == null && hours !== null) {
        color = '#C1FFF7'
      } else if (status == '1' && hours !== null) {
        color = '#12AF9B'
      } else if (status == '0' && hours !== null) {
        color = '#FF5050'
      } else if (status == -1) {
        color = '#E9EEF5'
      } else {
        color = 'transparent'
      }
      if (hours !== null) {
        return {
          title: hours.toString(),
          date: date,
          backgroundColor: color
        };
      } else {
        return {
          title: 0,
          date: date,
          backgroundColor: color
        };
      }
    }).filter(item => item !== undefined);
    console.log(events)
    return events
  }
}
