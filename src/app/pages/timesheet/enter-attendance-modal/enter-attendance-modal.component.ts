import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-attendance-modal',
  templateUrl: './enter-attendance-modal.component.html',
  styleUrls: ['./enter-attendance-modal.component.scss']
})
export class EnterAttendanceModalComponent implements OnInit {

  @Input() worker;
  constructor() { }

  ngOnInit(): void {
    console.log(this.worker)
  }

}
