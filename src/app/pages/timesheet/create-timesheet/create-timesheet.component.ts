import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, TimesheetService } from 'src/app/shared/services/public-api';


@Component({
  selector: 'app-create-timesheet',
  templateUrl: './create-timesheet.component.html',
  styleUrls: ['./create-timesheet.component.scss'],

})
export class CreateTimesheetComponent implements OnInit {

  users;
  timesheetform: FormGroup
  selectedAdmin = []
  isEdit: boolean = false;
  timesheetid;
  timesheetdata;

  projectId;
  projectDetails = null;
  start_date;
  end_date;
  status;
  localwork;
  scanning;
  hours;
  break;
  break_duration;
  break_duration_type;
  assign_admin

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private timesheetService: TimesheetService,
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {
    this.checkForEditRoute();
  }

  ngOnInit(): void {

    // initialize form group
    this.timesheetform = this.fb.group({
      start_date: [''],
      end_date: [''],
      status: [''],
      localwork: [''],
      scanning: [''],
      hours: [''],
      break: [''],
      break_duration: [''],
      break_duration_type: [''],
      assign_admin: ['']
    })

    // check if edit or not
    // if edit then set default values
    if (this.isEdit) {
      // time sheet id
      this.route.params.subscribe(params => {
        this.timesheetid = params['id'];
      });

      // time sheet data
      this.timesheetService.getTimesheetById(this.timesheetid).subscribe(res => {

        this.timesheetdata = res.data
        let assignadmin = JSON.parse(res.data.assign_admin)
        let assignadminarray = [];

        for (let adm of assignadmin) {
          adm.role = JSON.parse(adm.role)
          let admin = {
            admin_id: adm.admin_id,
            manage_time: adm.manage_time == '1' ? true : false,
            manage_worker: adm.manage_worker == '1' ? true : false
          }
          assignadminarray.push(admin)
        }

        // console.log(assignadminarray)
        this.assign_admin = assignadminarray
        this.projectId = this.timesheetdata.project_id
        this.start_date = this.timesheetdata.start_date
        this.end_date = this.timesheetdata.end_date
        this.status = this.timesheetdata.status == '1' ? true : false
        this.localwork = this.timesheetdata.localwork == '1' ? true : false
        this.scanning = this.timesheetdata.scanning == '1' ? true : false
        this.hours = this.timesheetdata.hours == '1' ? true : false
        this.break = this.timesheetdata.break == '1' ? true : false
        this.break_duration = this.timesheetdata.break_duration;
        this.break_duration_type = this.timesheetdata.break_duration_type;

        this.timesheetform.patchValue({
          start_date: this.start_date,
          end_date: this.end_date,
          status: this.status,
          localwork: this.localwork,
          scanning: this.scanning,
          hours: this.hours,
          break: this.break,
          break_duration: this.break_duration,
          break_duration_type: this.break_duration_type,
          assign_admin: this.assign_admin
        })

        this.timesheetService.getProjectById(this.timesheetdata.project_id).subscribe(res => {
          this.projectDetails = res.data
        })

        this.timesheetService.getUsers().subscribe(res => {
          for (let user of res.data) {
            user.fullname = `${user.finm} ${user.lamn}`;
            user.manage_time = false;
            user.manage_worker = false

            let isAdmin = this.assign_admin.find(admin => admin.admin_id === user.id)
            if (isAdmin) {
              console.log(user.id)
              console.log(user)
              console.log(isAdmin)
              user.manage_time = isAdmin.manage_time;
              user.manage_worker = isAdmin.manage_worker
              this.selectedAdmin = [...this.selectedAdmin, user]
            }
            console.log(this.selectedAdmin)
          }
          this.users = res.data
        })

      })
    } else {

      // new timesheet create
      this.route.params.subscribe(params => {
        this.projectId = params['id'];
      });

      this.timesheetService.getProjectById(this.projectId).subscribe(res => {
        this.projectDetails = res.data
      })

      // console.log(JSON.stringify(this.assign_admin))

      this.timesheetService.getUsers().subscribe(res => {
        for (let user of res.data) {
          user.fullname = `${user.finm} ${user.lamn}`;
          user.manage_time = false;
          user.manage_worker = false
        }
        this.users = res.data
      })
    }
  }

  checkForEditRoute() {
    const currentUrlSegment = this.route.snapshot.url.join('/');
    this.isEdit = currentUrlSegment.includes('edit');
  }

  onSelectWorker(selectedValue) {
    console.log(selectedValue);
    this.selectedAdmin = selectedValue
  }

  onFormSubmit() {
    // console.log(this.timesheetform.value)

    let assign_admin = this.selectedAdmin.map((admin) => {
      return {
        manage_time: admin.manage_time ? "1" : "0",
        manage_worker: admin.manage_worker ? "1" : "0",
        admin_id: admin.id
      }
    })


    let timesheetData = {
      projectid: this.projectId,
      start_date: this.timesheetform.value.start_date,
      end_date: this.timesheetform.value.end_date,
      status: this.timesheetform.value.status ? '1' : '0',
      localwork: this.timesheetform.value.localwork ? '1' : '0',
      scanning: this.timesheetform.value.scanning ? '1' : '0',
      hours: this.timesheetform.value.hours ? '1' : '0',
      break: this.timesheetform.value.break ? '1' : '0',
      break_duration: this.timesheetform.value.break_duration,
      break_duration_type: this.timesheetform.value.break_duration_type,
      assign_admin: assign_admin
    }

    if (!this.isEdit) {
      this.timesheetService.createTimesheet(timesheetData).subscribe(res => {
        console.log(res)
        if (res.type == 'success') {
          this.router.navigate([`/app/timesheet`]);

        }
      })
    } else {
      timesheetData['timesheetid'] = this.timesheetdata.id;
      console.log(timesheetData)
      this.timesheetService.updateTimesheet(timesheetData).subscribe(res => {
        console.log(res)
        if (res.type == 'success') {
          this.router.navigate([`/app/timesheet`]);
        }
      })
    }

    // console.log(this.selectedAdmin)
    // console.log(timesheetData)
  }

  toggleManageTime(user: any) {
    user.manage_time = !user.manage_time;
  }

  toggleManageWorkers(user: any) {
    user.manage_worker = !user.manage_worker;
  }
}
