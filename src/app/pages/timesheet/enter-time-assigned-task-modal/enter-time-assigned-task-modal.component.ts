import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-enter-time-assigned-task-modal',
  templateUrl: './enter-time-assigned-task-modal.component.html',
  styleUrls: ['./enter-time-assigned-task-modal.component.scss']
})
export class EnterTimeAssignedTaskModalComponent implements OnInit {

  
  @Input() worker;
  constructor() { }

  ngOnInit(): void {
    console.log(this.worker)
  }

}
