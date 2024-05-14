import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
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
  generated_timesheet_id;

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
    private toastrService: NbToastrService,
    private fb: FormBuilder
  ) {
    this.checkForEditRoute();
  }

  ngOnInit(): void {

    // initialize form group
    this.timesheetform = this.fb.group({
      start_date: [''],
      end_date: [''],
      status: [true],
      localwork: [''],
      scanning: new FormControl({ value: '', disabled: true }),
      hours: new FormControl({ value: '', disabled: true }),
      break: new FormControl({ value: '', disabled: true }),
      break_duration: new FormControl({ value: '0', disabled: true }),
      break_duration_type: new FormControl({ value: '', disabled: true }),
      assign_admin: ['']
    })

    // check if edit or not
    // if edit then set default values
    if (this.isEdit) {
      // initialize form group
      this.timesheetform = this.fb.group({
        start_date: [''],
        end_date: [''],
        status: [true],
        localwork: [''],
        scanning: [''],
        hours: [''],
        break: [''],
        break_duration: ['0'],
        break_duration_type: [''],
        assign_admin: ['']
      })
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
            manage_time: adm.role.manage_time == '1' ? true : false,
            manage_worker: adm.role.manage_worker == '1' ? true : false
          }
          assignadminarray.push(admin)
        }

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
              user.manage_time = isAdmin.manage_time;
              user.manage_worker = isAdmin.manage_worker
              this.selectedAdmin = [...this.selectedAdmin, user]

            }
          }
          this.users = res.data
        })

      })
    } else {
      // initialize form group
      this.timesheetform = this.fb.group({
        start_date: [''],
        end_date: [''],
        status: [true],
        localwork: [''],
        scanning: new FormControl({ value: '', disabled: true }),
        hours: new FormControl({ value: '', disabled: true }),
        break: new FormControl({ value: '', disabled: true }),
        break_duration: new FormControl({ value: '0', disabled: true }),
        break_duration_type: new FormControl({ value: '', disabled: true }),
        assign_admin: ['']
      })
      // new timesheet create
      this.route.params.subscribe(params => {
        this.projectId = params['id'];
      });

      this.timesheetService.getTimesheetId().subscribe(res => {
        console.log(res)
        this.generated_timesheet_id = res.data.timesheetId

      })
      this.timesheetService.getProjectById(this.projectId).subscribe(res => {
        this.projectDetails = res.data
      })

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
    if (selectedValue && !this.selectedAdmin.some(user => user.id === selectedValue.id)) {
      this.users = this.users.filter(user => user.fullname !== selectedValue.fullname);
      this.selectedAdmin = [...this.selectedAdmin, selectedValue];
    }
  }

  refershQRCode() {
    console.log("Clicked")
    this.timesheetService.refreshQRCode(this.timesheetdata.project_id)
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
      break_duration: this.timesheetform.value.break_duration ? this.timesheetform.value.break_duration : '0',
      break_duration_type: this.timesheetform.value.break_duration_type,
      assign_admin: assign_admin,
    }

    console.log(timesheetData)
    if (!this.isEdit) {
      timesheetData['timesheet_id'] = this.generated_timesheet_id

      this.timesheetService.createTimesheet(timesheetData).subscribe(res => {
        console.log(res)
        if (res.type == 'success') {
          this.router.navigate([`/app/timesheet`]);
        }
      },
        error => {
          console.error('An error occurred:', error);
          // Optionally, you can add error handling logic here, such as displaying an error message to the user.
          this.toastrService.warning('Please complete the timesheet.', 'Error', {
            duration: 3000,
          });
        }
      )
    } else {
      timesheetData['timesheetid'] = this.timesheetdata.id;
      console.log(timesheetData)
      this.timesheetService.updateTimesheet(timesheetData).subscribe(res => {
        console.log(res)
        if (res.type == 'success') {
          this.router.navigate([`/app/timesheet/${this.timesheetid}`]);
        }
      },
        error => {
          console.error('An error occurred:', error);
          this.toastrService.warning('Please complete the timesheet.', 'Error', {
            duration: 3000,
          });
        }
      )
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

  toggleLocalWork(data) {
    if (data.checked) {
      this.timesheetform.get('scanning')?.enable()
    } else {
      this.timesheetform.get('scanning')?.disable()
      this.timesheetform.get('hours')?.disable()
      this.timesheetform.get('break')?.disable()
      this.timesheetform.get('break_duration')?.disable()
      this.timesheetform.get('break_duration_type')?.disable()
    }
  }
  // scanning: new FormControl({ value: '', disabled: true }),
  // hours: new FormControl({ value: '', disabled: true }),
  // break: new FormControl({ value: '', disabled: true }),
  // break_duration: new FormControl({ value: '', disabled: true }),
  // break_duration_type: [''],
  // assign_admin: ['']
  toggleScanning(data) {
    if (data.checked) {
      this.timesheetform.get('hours')?.enable()
    } else {
      this.timesheetform.get('hours')?.disable()
      this.timesheetform.get('break')?.disable()
      this.timesheetform.get('break_duration')?.disable()
      this.timesheetform.get('break_duration_type')?.disable()
    }
  }

  toggleHours(data) {
    if (data.checked) {
      this.timesheetform.get('break')?.enable()
    } else {
      this.timesheetform.get('break')?.disable()
      this.timesheetform.get('break_duration')?.disable()
      this.timesheetform.get('break_duration_type')?.disable()
    }
  }

  toggleBreak(data) {
    if (data.checked) {
      this.timesheetform.get('break_duration')?.enable()
      this.timesheetform.get('break_duration_type')?.enable()
    } else {
      this.timesheetform.get('break_duration')?.disable()
      this.timesheetform.get('break_duration_type')?.disable()
    }
  }

}
