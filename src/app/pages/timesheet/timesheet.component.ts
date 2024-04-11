import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class TimesheetComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }
  

  ngOnInit(): void {
  }

  createTimeSheet() {
    const activeModal = this.modalService.open(CreateTimesheetModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });
    
  }
}
