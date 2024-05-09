import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-worker-assign-worker-modal',
  templateUrl: './manage-worker-assign-worker-modal.component.html',
  styleUrls: ['./manage-worker-assign-worker-modal.component.scss']
})
export class ManageWorkerAssignWorkerModalComponent implements OnInit {

  @Input() worker_id;
  @Input() updateAssignWork;
  assign_work;
  works = ['Clearing', 'Demolition', 'Excavation', 'Roofing']
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    console.log(this.worker_id)
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  onSelectAssignWork(selectedValue: any) {
    console.log(selectedValue)
  }

  saveAssignWork() {
    console.log(this.assign_work)
    if (this.assign_work == undefined) {
      this.toastrService.warning('Please assign work.', 'Error', {
        duration: 3000,
      });
    } else {
      this.updateAssignWork(this.worker_id, this.assign_work.join(','));
      this.activeModal.close();
    }

  }


}
