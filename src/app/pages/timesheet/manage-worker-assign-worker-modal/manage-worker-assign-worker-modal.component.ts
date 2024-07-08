import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-manage-worker-assign-worker-modal',
  templateUrl: './manage-worker-assign-worker-modal.component.html',
  styleUrls: ['./manage-worker-assign-worker-modal.component.scss']
})
export class ManageWorkerAssignWorkerModalComponent implements OnInit {

  @Input() worker_id;
  @Input() timesheetid;
  @Input() updateAssignWork;
  @Input() worker;

  assign_work;
  timesheetdata
  works = []
  worknotavailable = false
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private timesheetService: TimesheetService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    if (this.worker.work_assignment != null) {
      this.assign_work = [...this.worker.work_assignment]
    }

    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let project_id = this.timesheetdata.project_id;
      this.timesheetService.getProjectWork(project_id).subscribe(res => {
        console.log(res)
        let workdata = res.data[0];
        if (workdata != null) {
          this.works = this.extractwork(workdata.data)
        } else {
          this.worknotavailable = true
        }
      })
    })
  }

  extractwork(data) {
    let valuesArray = [];
    data.forEach(element => {
      element.Values.forEach(value => {
        for (let key in value) {
          valuesArray.push(value[key]);
        }
      });
    });

    return valuesArray;
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
