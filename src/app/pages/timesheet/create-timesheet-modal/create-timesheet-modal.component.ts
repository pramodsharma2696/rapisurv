import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-create-timesheet-modal',
  templateUrl: './create-timesheet-modal.component.html',
  styleUrls: ['./create-timesheet-modal.component.scss']
})
export class CreateTimesheetModalComponent implements OnInit {
  @Input() exsitingProjectIds;

  projects;
  selectedProject;
  constructor(
    private activeModal: NgbActiveModal,
    private router: Router,
    private timesheetService: TimesheetService
  ) { }

  ngOnInit(): void {
    console.log(this.exsitingProjectIds)
    this.timesheetService.getAllProject().subscribe(res => {
      let projectsdata = res.data
      this.projects = projectsdata.filter(prj => !this.exsitingProjectIds.includes(prj.id))
    })
  }

  onSelectProject(selectedValue: any) {
    this.selectedProject = selectedValue;
  }

  closeModal(status) {
    this.activeModal.close({ data: null, status: 206 });
  }

  gotoTimesheet() {
    this.router.navigate([`/app/timesheet/create`, this.selectedProject.id]);
    this.activeModal.close({ data: {}, status: 200 });
  }

  getProjectLabel(project) {
    return `${project.id} - ${project.Description}`;
  }

}
