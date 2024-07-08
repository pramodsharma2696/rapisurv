import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-view-qr-code-modal',
  templateUrl: './view-qr-code-modal.component.html',
  styleUrls: ['./view-qr-code-modal.component.scss']
})
export class ViewQrCodeModalComponent implements OnInit {
  @Input() qrlink: any;
  @Input() project: any;

  constructor(
    private activeModal: NgbActiveModal,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.qrlink);
    console.log(this.project)
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  printAssignRole() {
    const printContent = document.getElementById('assignRole').innerHTML;
    const printWindow = window.open('', '', 'height=600,width=800');

    printWindow.document.write('</head><body>');
    printWindow.document.write(printContent);
    printWindow.document.write('</body></html>');

    printWindow.document.close();
    printWindow.print();

    printWindow.onafterprint = function () {
      printWindow.close();
    };
  }
}
