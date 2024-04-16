import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-worker-assign-worker-modal',
  templateUrl: './manage-worker-assign-worker-modal.component.html',
  styleUrls: ['./manage-worker-assign-worker-modal.component.scss']
})
export class ManageWorkerAssignWorkerModalComponent implements OnInit {

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

}
