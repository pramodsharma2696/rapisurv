import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-qr-code-modal',
  templateUrl: './view-qr-code-modal.component.html',
  styleUrls: ['./view-qr-code-modal.component.scss']
})
export class ViewQrCodeModalComponent implements OnInit {

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
