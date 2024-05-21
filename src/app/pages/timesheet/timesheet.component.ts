import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  timesheets = []
  showTimesheets = false
  exsitingProjectIds = []

  constructor(
    private modalService: NgbModal,
    private timesheetService: TimesheetService

  ) {
    console.log("Const timesheet")
  }


  ngOnInit(): void {
    console.log("On init")

    this.timesheetService.getWorkingDays('2024-04-25', '2025-05-02').subscribe(res => {
      console.log(res)
    })

    this.timesheetService.getTimesheets().subscribe(res => {
      console.log('timesheets ')
      console.log(res.data)
      this.timesheets = res.data
      this.exsitingProjectIds = this.timesheets.map(ts => ts.project_id)

      let len = res.data.length;
      if (len > 0) {
        this.showTimesheets = true
      }
    })

  }

  createTimeSheet() {
    const activeModal = this.modalService.open(CreateTimesheetModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });

    activeModal.componentInstance.exsitingProjectIds = this.exsitingProjectIds
  }
}
