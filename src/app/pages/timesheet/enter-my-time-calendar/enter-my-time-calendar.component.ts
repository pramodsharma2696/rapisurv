import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';

@Component({
  selector: 'app-enter-my-time-calendar',
  templateUrl: './enter-my-time-calendar.component.html',
  styleUrls: ['./enter-my-time-calendar.component.scss']
})
export class EnterMyTimeCalendarComponent implements OnInit {
  calendarOptions: CalendarOptions;

  constructor() { }

  ngOnInit(): void {

    this.calendarOptions = {
      initialView: 'dayGridMonth',

      events: [
        { title: '20', date: '2024-05-01', backgroundColor: '#C1FFF7' },
        { title: '10', date: '2024-05-02', backgroundColor: '#E9EEF5' },
        { title: '10', date: '2024-05-03', backgroundColor: '#12AF9B' },
        { title: '10', date: '2024-05-05', backgroundColor: '#FF5050' },
        { title: '10', date: '2024-05-06', backgroundColor: '#C1FFF7' },
        { title: '10', date: '2024-05-07', backgroundColor: '#C1FFF7' },
        { title: '10', date: '2024-05-08', backgroundColor: '#C1FFF7' },
        { title: '10', date: '2024-05-09', backgroundColor: '#E9EEF5' },
        { title: '10', date: '2024-05-10', backgroundColor: '#FF5050' },
        { title: '10', date: '2024-05-12', backgroundColor: '#C1FFF7' },
        { title: '10', date: '2024-05-14', backgroundColor: '#E9EEF5' },
        { title: '10', date: '2024-05-15', backgroundColor: '#12AF9B' },
        { title: '10', date: '2024-05-16', backgroundColor: '#FF5050' }
      ],
      plugins: [dayGridPlugin],
      eventColor: 'transparent',
      eventTextColor: 'black',

    };
  }


}
