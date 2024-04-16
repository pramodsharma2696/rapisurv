import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';

@Component({
  selector: 'app-manage-worker-add-local-worker-modal',
  templateUrl: './manage-worker-add-local-worker-modal.component.html',
  styleUrls: ['./manage-worker-add-local-worker-modal.component.scss']
})
export class ManageWorkerAddLocalWorkerModalComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }


  ngOnInit(): void {
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  
  inviteWorker(){
    console.log("Invite clicked")
    this.activeModal.close({ data:  {}, status: 200 });

    const activeModal = this.modalService.open(ManageWorkerInviteWorkersModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });
  }
}
