import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TimesheetComponent } from './timesheet.component';
import { CreateTimesheetComponent } from './create-timesheet/create-timesheet.component';
import { ProjectDetailsComponent } from './project-details/project-details.component';

const routes: Routes = [
    {
        path: '',
        component: TimesheetComponent,
    },
    {
        path: 'create/:id',
        component: CreateTimesheetComponent
    },
    {
        path: 'edit/:id',
        component: CreateTimesheetComponent
    },
    {
        path: ':id',
        component: ProjectDetailsComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TimesheetRoutingModule { }
