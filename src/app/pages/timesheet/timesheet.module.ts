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
import {MatTableModule} from '@angular/material/table';
import { AttendanceMonthlyTableComponent } from './attendance-monthly-table/attendance-monthly-table.component';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatOption } from '@angular/material/core';


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
    AttendanceMonthlyTableComponent

  ],
  imports: [
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
    MatSelectModule
  ]
})
export class TimesheetModule { }
