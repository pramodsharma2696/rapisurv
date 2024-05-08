import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';

@Component({
  selector: 'app-enter-my-time-calendar',
  templateUrl: './enter-my-time-calendar.component.html',
  styleUrls: ['./enter-my-time-calendar.component.scss']
})
export class EnterMyTimeCalendarComponent implements OnInit {

 
  selectedDate: Date = new Date();
  datesToBeHighlighted = [
    { date: new Date('2024-05-01'), status: 'time-captured' },
    { date: new Date('2024-05-05'), status: 'non-work-day' },
    { date: new Date('2024-05-06'), status: 'time-captured' },
    { date: new Date('2024-05-07'), status: 'time-approved' },
    { date: new Date('2024-05-08'), status: 'time-captured' },
    { date: new Date('2024-05-09'), status: 'time-rejected' },
    { date: new Date('2024-05-11'), status: 'time-captured' },
    { date: new Date('2024-05-15'), status: 'non-work-day' },
    { date: new Date('2024-05-16'), status: 'time-captured' },
    { date: new Date('2024-05-17'), status: 'time-approved' },
    { date: new Date('2024-05-18'), status: 'time-captured' },
    { date: new Date('2024-05-19'), status: 'time-rejected' }
  ];
  constructor() { }

  ngOnInit(): void {
  }


  dateClass() {
    return (date: Date): MatCalendarCellCssClasses => {

      const matchedDate = this.datesToBeHighlighted.find(item => {
        console.log('item.date:', item.date.toDateString());
        console.log('date:', date.toDateString());
        return item.date.toDateString() === date.toDateString();
      });
      console.log(date)
      console.log(matchedDate)
      return matchedDate ? matchedDate.status : '';
    };
  }
}
