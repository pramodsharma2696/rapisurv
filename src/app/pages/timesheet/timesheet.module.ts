import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { SummaryComponent } from './summary/summary.component';
import { EnterMyTimeComponent } from './enter-my-time/enter-my-time.component';
import { ProjectDetailCardComponent } from './project-detail-card/project-detail-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { ManageWorkerComponent } from './manage-worker/manage-worker.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { AttendanceWeeklyTableComponent } from './attendance-weekly-table/attendance-weekly-table.component';
import { MatTableModule } from '@angular/material/table';
import { AttendanceMonthlyTableComponent } from './attendance-monthly-table/attendance-monthly-table.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { WeekDaysSelectComponent } from './week-days-select/week-days-select.component';
import { ManageWorkerAddLocalWorkerModalComponent } from './manage-worker-add-local-worker-modal/manage-worker-add-local-worker-modal.component';
import { ManageWorkerAssignWorkerModalComponent } from './manage-worker-assign-worker-modal/manage-worker-assign-worker-modal.component';
import { ManageWorkerInviteWorkersModalComponent } from './manage-worker-invite-workers-modal/manage-worker-invite-workers-modal.component';
import { ViewQrCodeModalComponent } from './view-qr-code-modal/view-qr-code-modal.component';
import {MatDatepickerModule} from '@angular/material/datepicker';

import { ReactiveFormsModule } from '@angular/forms';
import { TimesheetRoutingModule } from './timesheet-routing.module';
import { EnterAttendanceModalComponent } from './enter-attendance-modal/enter-attendance-modal.component';
import { EnterTimeAssignedTaskModalComponent } from './enter-time-assigned-task-modal/enter-time-assigned-task-modal.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { EnterMyTimeCalendarComponent } from './enter-my-time-calendar/enter-my-time-calendar.component';

@NgModule({
  declarations: [
    TimesheetComponent,
    CreateTimesheetComponent,
    CreateTimesheetModalComponent,
    ApproveTimesheetComponent,
    SummaryComponent,
    EnterMyTimeComponent,
    ProjectDetailCardComponent,
    ProjectDetailsComponent,
    AttendanceComponent,
    ManageWorkerComponent,
    AttendanceWeeklyTableComponent,
    AttendanceMonthlyTableComponent,
    WeekDaysSelectComponent,
    ManageWorkerAddLocalWorkerModalComponent,
    ManageWorkerAssignWorkerModalComponent,
    ManageWorkerInviteWorkersModalComponent,
    ViewQrCodeModalComponent,
    EnterAttendanceModalComponent,
    EnterTimeAssignedTaskModalComponent,
    EnterMyTimeCalendarComponent
  ],
  imports: [
    CommonModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatIconModule,
    NgSelectModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    FormsModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
    TimesheetRoutingModule,
    MatPaginatorModule,
    MatDatepickerModule
  ]
})
export class TimesheetModule { }
