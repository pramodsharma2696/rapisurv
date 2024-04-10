import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-create-timesheet-modal',
  templateUrl: './create-timesheet-modal.component.html',
  styleUrls: ['./create-timesheet-modal.component.scss']
})
export class CreateTimesheetModalComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  
  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  gotoTimesheet(){
    this.router.navigate(['/app/timesheet/create']);
    // this.closeModal()
    this.activeModal.close({ data:  {}, status: 200 });
  }
}
