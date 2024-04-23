import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ManageWorkerInviteWorkersModalComponent } from '../manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';

// Interface for Worker
export interface Worker {
  workerId: number;
  firstName: string;
  lastName: string;
  status: string;
  plannedHours: number;
}

@Component({
  selector: 'app-manage-worker',
  templateUrl: './manage-worker.component.html',
  styleUrls: ['./manage-worker.component.scss']
})
export class ManageWorkerComponent implements OnInit {
  dataSource = new MatTableDataSource<Worker>();
  displayedColumns: string[] = ['workerId', 'firstName', 'lastName', 'status', 'plannedHours'];

  constructor(
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.dataSource.data = [
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},
      {workerId: 1, firstName: 'John', lastName: 'Doe', status: 'yes', plannedHours: 40},

    ];
  }

  inviteWorker(){
    const activeModal = this.modalService.open(ManageWorkerInviteWorkersModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
    });
  }
}
