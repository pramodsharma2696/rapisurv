import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimesheetComponent } from './timesheet.component';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';
import { CreateTimesheetModalComponent } from './create-timesheet-modal/create-timesheet-modal.component';
import { ApproveTimesheetComponent } from './approve-timesheet/approve-timesheet.component';
import { AttendanceComponent } from './attendance/attendance.component';
import { EnterMyTimeComponent } from './enter-my-time/enter-my-time.component';
import { ProjectDetailCardComponent } from './project-detail-card/project-detail-card.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import { SummaryComponent } from './summary/summary.component';
import { ManageWorkerComponent } from './manage-worker/manage-worker.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgSelectModule } from '@ng-select/ng-select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';


@NgModule({
  declarations: [
    TimesheetComponent,
    CreateTimesheetComponent,
    CreateTimesheetModalComponent,
    ApproveTimesheetComponent,
    AttendanceComponent,
    EnterMyTimeComponent,
    ProjectDetailCardComponent,
    ProjectDetailsComponent,
    SummaryComponent,
    ManageWorkerComponent
  ],
  imports: [
    MatSlideToggleModule,
    MatRadioModule,
    MatCheckboxModule,
    MatIconModule,
    MatIconModule,
    NgSelectModule,
    MatTabsModule,
    MatCardModule
  ]
})
export class TimesheetModule { }
