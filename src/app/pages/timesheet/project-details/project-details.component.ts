import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQrCodeModalComponent } from '../view-qr-code-modal/view-qr-code-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { TimesheetService } from 'src/app/shared/services/public-api';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AttendanceComponent } from '../attendance/attendance.component';
import { SummaryComponent } from '../summary/summary.component';
import { ApproveTimesheetComponent } from '../approve-timesheet/approve-timesheet.component';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.scss']
})
export class ProjectDetailsComponent implements OnInit {

  timesheetid;
  timesheetdata;
  project;
  qrlink;

  @ViewChild(AttendanceComponent) attendanceComponent: AttendanceComponent;
  @ViewChild(SummaryComponent) summaryComponent: SummaryComponent;
  @ViewChild(ApproveTimesheetComponent) approveTimesheetComponent: ApproveTimesheetComponent;


  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService

  ) { }


  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.timesheetid = params['id'];
    });
    console.log(this.timesheetid)
    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let projectId = res.data.project_id
      this.qrlink = res.data.timesheet_qr

      this.timesheetService.getProjectById(projectId).subscribe(res => {
        console.log("Projects ----->")
        console.log(res.data)
        this.project = res.data;
      })
    })

    // this.timesheetService.getTimesheetQR(1146).subscribe(res => {
    //   this.qrlink = res?.data.timesheet_qr
    //   console.log(res?.data.timesheet_qr)
    // })

  }

  showQRCode() {
    const activeModal = this.modalService.open(ViewQrCodeModalComponent, {
      size: 'md',
      container: 'nb-layout',
      centered: true,
      // data: this.qrlink
    });
    activeModal.componentInstance.qrlink = this.qrlink
  }

  editTimesheet() {
    this.router.navigate([`/app/timesheet/edit`, this.timesheetid]);

  }

  formatDate(dateA: string): string {
    if (dateA == null) {
      return ''
    }
    let date = new Date(dateA)
    const day: number = date.getDate();
    const month: string = date.toLocaleString('en-us', { month: 'short' });
    const year: number = date.getFullYear();

    const suffix: string = this.getDaySuffix(day);

    return `${day}${suffix} ${month} ${year}`;
  }

  getDaySuffix(day: number): string {
    if (day === 1 || day === 21 || day === 31) {
      return 'st';
    } else if (day === 2 || day === 22) {
      return 'nd';
    } else if (day === 3 || day === 23) {
      return 'rd';
    } else {
      return 'th';
    }
  }

  tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // Fetch data when the tab is changed
    if (tabChangeEvent.index === 0) {
      this.summaryComponent.fetchData()
    } else if (tabChangeEvent.index === 1) {
      this.attendanceComponent.fetchMonthly()
    } else if (tabChangeEvent.index === 4) {
      this.approveTimesheetComponent.fetchData()
    }
  }
}
