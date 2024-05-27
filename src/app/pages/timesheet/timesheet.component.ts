import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';
import { AuthService, TimesheetService } from 'src/app/shared/services/public-api';

@Component({
  selector: 'app-timesheet',
  templateUrl: './timesheet.component.html',
  styleUrls: ['./timesheet.component.scss'],
})
export class TimesheetComponent implements OnInit {
  timesheets = []
  showTimesheets = false
  exsitingProjectIds = []
  projects = []
  searchTerm: string = '';
  filteredTimesheets = []
  projectLookup = []
  constructor(
    private modalService: NgbModal,
    private timesheetService: TimesheetService,
    private authService: AuthService


  ) { }


  ngOnInit(): void {

    this.authService.setCurrentPage("Timesheet")
    this.timesheetService.getWorkingDays('2024-04-25', '2025-05-02').subscribe(res => {
      console.log(res)
    })


    this.timesheetService.getTimesheets().subscribe(res => {
      this.timesheets = res.data
      this.timesheets = this.timesheets;
      this.filteredTimesheets = this.timesheets

      this.timesheetService.getAllProject().subscribe(res => {
        console.log(res.data)
        let projectsdata = res.data
        this.projects = projectsdata.filter(prj => !this.exsitingProjectIds.includes(prj.id))

        this.projectLookup = res.data.reduce((acc, project) => {
          acc[project.id] = project;
          return acc;
        }, {});

        // const mergedTimesheets = this.timesheets.map(entry => {
        //   const projectDetails = projectLookup[entry.project_id];
        //   return {
        //     ...entry,
        //     project: projectDetails
        //   };
        // });

        console.log("meredsf")
        // console.log(mergedTimesheets)
      })

      this.exsitingProjectIds = this.timesheets.map(ts => ts.project_id)

      let len = res.data.length;
      if (len > 0) {
        this.showTimesheets = true
      }
    })

  }

  searchTimesheets() {
    const term = this.searchTerm.toLowerCase();
    console.log(term)
    console.log(this.projectLookup)
    if (term == '') {
      this.filteredTimesheets = this.timesheets
    } else {
      console.log(this.timesheets)
      this.filteredTimesheets = this.timesheets.filter(ts => {
        console.log(ts.project_id)
        console.log(this.projectLookup[ts.project_id])
        const projectIdMatch = ts.project_id.toString().includes(term);

        const descriptionMatch = this.projectLookup[ts.project_id] && this.projectLookup[ts.project_id].Description.toLowerCase().includes(term);
        return projectIdMatch || descriptionMatch;
      });
    }
  }

  createTimeSheet() {
    const activeModal = this.modalService.open(CreateTimesheetModalComponent, {
      size: 'sm',
      container: 'nb-layout',
      centered: true,
    });

    activeModal.componentInstance.exsitingProjectIds = this.exsitingProjectIds
  }
}
