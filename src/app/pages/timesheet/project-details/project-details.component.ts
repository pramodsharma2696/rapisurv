import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ViewQrCodeModalComponent } from '../view-qr-code-modal/view-qr-code-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService, EStorageTarget, STORAGE_KEY_USER_DATA, TimesheetService, WebStorageService } from 'src/app/shared/services/public-api';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { AttendanceComponent } from '../attendance/attendance.component';
import { SummaryComponent } from '../summary/summary.component';
import { ApproveTimesheetComponent } from '../approve-timesheet/approve-timesheet.component';
import { EnterMyTimeComponent } from '../enter-my-time/enter-my-time.component';

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
  assignedAdmin = []
  users = []
  loggedadmin;
  managetime = false
  manageworker = false
  manage_approval = false
  @ViewChild(AttendanceComponent) attendanceComponent: AttendanceComponent;
  @ViewChild(SummaryComponent) summaryComponent: SummaryComponent;
  @ViewChild(ApproveTimesheetComponent) approveTimesheetComponent: ApproveTimesheetComponent;
  @ViewChild(EnterMyTimeComponent) entermytime: EnterMyTimeComponent;


  constructor(
    private modalService: NgbModal,
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private authService: AuthService,
    private storageService: WebStorageService
  ) { }


  ngOnInit(): void {
    const userData = this.storageService.getItem(STORAGE_KEY_USER_DATA, {
      target: EStorageTarget.LocalStorage,
    });
    this.route.params.subscribe(params => {
      this.timesheetid = params['id'];
    });

    this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {
      this.timesheetdata = res.data
      let projectId = res.data.project_id
      this.qrlink = res.data.timesheet_qr
      let assigned_admins = JSON.parse(this.timesheetdata.assign_admin)
      if (assigned_admins.length > 0) {
        let admin = assigned_admins.find(item => item.admin_id === userData.id);
      
        if (admin != undefined)
          admin.role = JSON.parse(admin.role)
        if (admin && admin.role.manage_time) {
          this.managetime = admin.role.manage_time == '1';
        }

        if (admin && admin.role.manage_worker) {
          this.manageworker = admin.role.manage_worker == '1';
        }

        if (admin && admin.role.manage_approval) {
          this.manage_approval = admin.role.manage_approval == '1';
        }

      }


      this.timesheetService.getUsers().subscribe(res => {
        for (let user of res.data) {
          user.fullname = `${user.finm} ${user.lamn}`;
          user.manage_time = false;
          user.manage_worker = false
          user.manage_approval = false
        }
        this.users = res.data

        this.timesheetdata.assign_admin = JSON.parse(this.timesheetdata.assign_admin)
        this.assignedAdmin = this.timesheetdata.assign_admin.map(adm => {
          let userdata = this.users.find(urs => urs.id == adm.admin_id)
          adm.user = userdata
          return adm
        })

        console.log(this.assignedAdmin)

      })




      this.timesheetService.getProjectById(projectId).subscribe(res => {
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
      this.authService.setCurrentPage("Summary")
      this.summaryComponent.fetchData()
    } else if (tabChangeEvent.index === 1) {
      this.authService.setCurrentPage("Attendance")
      this.attendanceComponent.fetchMonthly()
    } else if (tabChangeEvent.index === 2) {
      this.authService.setCurrentPage("Enter Time")
      this.entermytime.fetchData()
    } else if (tabChangeEvent.index === 3) {
      this.authService.setCurrentPage("Manage Worker")
      this.entermytime.fetchData()
    } else if (tabChangeEvent.index === 4) {
      this.authService.setCurrentPage("Approve Timesheet")
      this.approveTimesheetComponent.fetchData()
    }
  }


  navigatetotimesheet() {
    this.router.navigate([`/app/timesheet`]);
  }
}
