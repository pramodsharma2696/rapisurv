import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss']
})
export class TimesheetComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }
  

  ngOnInit(): void {
  }

  createTimeSheet() {
    const activeModal = this.modalService.open(CreateTimesheetModalComponent, {
      size: 'lg',
      container: 'nb-layout',
      centered: true,
    });
    
  }
}
