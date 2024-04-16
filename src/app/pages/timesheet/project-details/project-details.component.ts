import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQrCodeModalComponent } from '../view-qr-code-modal/view-qr-code-modal.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  constructor(
    private modalService: NgbModal,

  ) { }

  ngOnInit(): void {
  }

  showQRCode() {
    const activeModal = this.modalService.open(ViewQrCodeModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });

  }
}
