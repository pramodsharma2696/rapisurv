import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-create-timesheet-modal',
  templateUrl: './create-timesheet-modal.component.html',
  styleUrls: ['./create-timesheet-modal.component.scss']
})
export class CreateTimesheetModalComponent implements OnInit {
  projects;
  selectedProject;
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private timesheetService: TimesheetService
  ) { }

  ngOnInit(): void {
    this.timesheetService.getAllProject().subscribe(res => {
      console.log("Projects ----->")
      console.log(res.data)
      this.projects = res.data
    })
  }

  onSelectProject(selectedValue: any) {
    this.selectedProject = selectedValue;
    console.log('Selected Project:', this.selectedProject);
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  gotoTimesheet() {
    console.log("Inside go to timsheet")
    this.router.navigate([`/app/timesheet/create`, this.selectedProject.id]);
    this.activeModal.close({ data: {}, status: 200 });
  }

  getProjectLabel(project) {
    console.log("label>>>>>")
    console.log(project)
    return `${project.id} - ${project.Description}`;
  }

}
